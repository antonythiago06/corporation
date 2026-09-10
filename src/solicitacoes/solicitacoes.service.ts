
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { Solicitacao } from './solicitacao.entity';
import { Auditoria } from '../auditoria/auditoria.entity';
import { FiltrarSolicitacaoDto } from './dto/filtrar-solicitacao.dto';


@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(Solicitacao)
    private readonly repository: Repository<Solicitacao>,
    private readonly dataSource: DataSource,
  ) {}

  listar(filtros?: FiltrarSolicitacaoDto) {
    return this.repository.find({
      where: {
        ...(filtros?.status && { status: filtros.status }),
        ...(filtros?.centroCusto && { centroCusto: filtros.centroCusto }),
        ...(filtros?.prioridade && { prioridade: filtros.prioridade }),
      },
      order: { id: 'ASC' },
    });
  }

  async buscarPorId(id: number) {
    const solicitacao = await this.repository.findOneBy({ id });
    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }
    return solicitacao;
  }

  criar(dto: CriarSolicitacaoDto) {
    const solicitacao = this.repository.create({
      titulo: dto.titulo,
      centroCusto: dto.centroCusto,
      status: 'pendente',
      prioridade: dto.prioridade,
    });
    return this.repository.save(solicitacao);
  }
  async remover(id: number): Promise<void> {
    await this.buscarPorId(id); 

    await this.repository.delete(id);
  }

   async aprovar(id: number, versaoEsperada: number, atorId: number) {
  return this.dataSource.transaction(async (manager) => {
    const solicitacao = await manager.findOneBy(Solicitacao, { id });

    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }
    if (solicitacao.status !== 'pendente') {
      throw new ConflictException('Solicitação não está pendente');
    }

    const resultado = await manager
      .createQueryBuilder()
      .update(Solicitacao)
      .set({ status: 'aprovada', versao: () => 'versao + 1' })
      .where('id = :id', { id })
      .andWhere('versao = :versao', { versao: versaoEsperada })
      .andWhere('status = :status', { status: 'pendente' })
      .execute();

    if (resultado.affected !== 1) {
      throw new ConflictException(
        'A solicitação foi alterada; consulte novamente',
      );
    }

    await manager.insert(Auditoria, {
      atorId,
      acao: 'SOLICITACAO_APROVADA',
      recursoTipo: 'solicitacao',
      recursoId: id,
      detalhes: {
        statusAnterior: 'pendente',
        statusAtual: 'aprovada',
        versaoAnterior: versaoEsperada,
      },
    });

    return manager.findOneByOrFail(Solicitacao, { id });
  });

  }
  async gerarRelatorio() {
    const solicitacoes = await this.repository.find();
    const total = solicitacoes.length;

    const porStatus = solicitacoes.reduce(
      (acc, s) => {
        acc[s.status] = (acc[s.status] || 0) + 1;
        return acc;
      },
      { pendente: 0, aprovada: 0 } as Record<string, number>,
    );

    
    return { total, porStatus };
  }
}




