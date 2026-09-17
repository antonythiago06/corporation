import { IsInt, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { request } from 'https';

export class RejeitarSolicitacaoDto {
  @IsInt()
  @Min(1)
  versao!: number;

  @IsString()
  @MinLength(10, { message: 'A justificativa deve ter conter no mínimo 10 caracteres.' })
  @MaxLength(200, { message: 'A justificativa deve ter conter no máximo 200 caracteres.' })
  justificativa!: string;

}