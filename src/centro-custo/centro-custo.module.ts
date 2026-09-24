import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroCusto } from './centro-custo.entity';
import { CentrosCustoController } from './centro-custo.controller';
import { CentrosCustoService } from './centro-custo.service';

@Module({
  imports: [TypeOrmModule.forFeature([CentroCusto])],
  controllers: [CentrosCustoController],
  providers: [CentrosCustoService],
})
export class CentrosCustoModule {}