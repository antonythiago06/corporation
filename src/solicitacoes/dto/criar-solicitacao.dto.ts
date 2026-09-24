import { IsString, MaxLength, MinLength, IsInt, Min } from 'class-validator';

export class CriarSolicitacaoDto {
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  titulo!: string;

  @IsString()
  @MaxLength(30)
  centroCusto!: string;

  @IsInt()
  @Min(0)
  valorEstimadoCentavos!: number;
  
  @IsString()
  @MaxLength(10)
  prioridade!: 'normal' | 'urgente';
}