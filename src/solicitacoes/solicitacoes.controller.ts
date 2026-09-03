import {  Controller,  Patch,  Param,  ParseIntPipe, UseGuards, Get } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Body, Post } from '@nestjs/common';
import { CriarSolicitacaoDto } from './dto/criar-solicitacao.dto';

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) {}

@UseGuards(JwtAuthGuard)
@Post()
criar(@Body() dto: CriarSolicitacaoDto) {
  return this.solicitacoesService.criar(dto);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('gestor', 'auditor')
    @Get('relatorio')
    gerarRelatorio() {
        return this.solicitacoesService.gerarRelatorio();
    }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('gestor', 'auditor') 
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.solicitacoesService.buscarPorId(id);
  }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('gestor')
@Patch(':id/aprovar')
aprovar(@Param('id', ParseIntPipe) id: number) {
  return this.solicitacoesService.aprovar(id);
    }
}