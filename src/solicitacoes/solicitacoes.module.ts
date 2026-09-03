import { Module } from '@nestjs/common';
import { SolicitacoesController } from './solicitacoes.controller';
import { SolicitacoesService } from './solicitacoes.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitacao } from './solicitacao.entity';


@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Solicitacao])],
  controllers: [SolicitacoesController],
  providers: [SolicitacoesService],
})
export class SolicitacoesModule {}