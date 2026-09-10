
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';
import { Solicitacao } from './solicitacao.entity';
import { FiltrarSolicitacaoDto } from './dto/filtrar-solicitacao.dto';


@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(Solicitacao)
    private readonly repository: Repository<Solicitacao>,
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

   async aprovar(id: number) {
    const solicitacao = await this.buscarPorId(id);
    solicitacao.status = 'aprovada';
    return this.repository.save(solicitacao);
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




