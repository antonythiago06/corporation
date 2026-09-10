import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import type { StatusSolicitacao, PrioridadeSolicitacao } from '../solicitacao.entity';

export class FiltrarSolicitacaoDto {
    
    @IsOptional()
    @IsIn(['pendente', 'aprovada'])
    status?: StatusSolicitacao;

    @IsOptional()
    @IsString()
    @MaxLength(150)
    titulo?: string;

    @IsOptional()
    @IsString()
    @MaxLength(30)
    centroCusto?: string;

    @IsOptional()
    @IsIn(['normal', 'urgente'])
    prioridade?: PrioridadeSolicitacao;
 }