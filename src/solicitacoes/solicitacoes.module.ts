import { Module } from '@nestjs/common';
import { SolicitacoesController } from './solicitacoes.controller';
import { SolicitacoesService } from './solicitacoes.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditoria } from '../auditoria/auditoria.entity';
import { Solicitacao } from './solicitacao.entity';


@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Solicitacao, Auditoria])],
  controllers: [SolicitacoesController],
  providers: [SolicitacoesService],
})
export class SolicitacoesModule {}