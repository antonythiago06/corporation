import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync({inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: Number(config.get('DB_PORT') ?? 5432),
        database: config.getOrThrow<string>('DB_NAME'),
        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),}), AuthModule, UsuariosModule, SolicitacoesModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
