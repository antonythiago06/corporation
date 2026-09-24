import { Column, Entity, PrimaryColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'centro_custo' })
export class CentroCusto {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  codigo!: string;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ name: 'saldo_disponivel_centavos', type: 'integer' })
  saldoDisponivelCentavos!: number;

  @VersionColumn({ name: 'versao' })
  versao!: number;
}