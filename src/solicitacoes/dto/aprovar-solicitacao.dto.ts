import { IsInt, Min } from 'class-validator';
import { request } from 'https';

export class AprovarSolicitacaoDto {
  @IsInt()
  @Min(1)
  versao!: number;

  @IsInt()
  @Min(1)
  versaoCentroCusto!: number;
}

