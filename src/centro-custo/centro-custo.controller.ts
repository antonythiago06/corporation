import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CentrosCustoService } from './centro-custo.service';

@Controller('centros-custo')
export class CentrosCustoController {
  constructor(private readonly service: CentrosCustoService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':codigo')
  buscarPorCodigo(@Param('codigo') codigo: string) {
    return this.service.buscarPorCodigo(codigo);
  }
}