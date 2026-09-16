import { Injectable } from '@nestjs/common';

export type Papel = 'solicitante' | 'gestor' | 'auditor';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  papel: Papel;
  ativo: boolean;
  matricula?: string;
};

export type UsuarioAutenticado = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Ana Lima',
      email: 'ana@empresa.com',
      senhaHash:
        '$2b$12$5S9LDbR3FznMAsZY5P..2OKE932dOHeVvGrmlfklgquClbkKgUidC',
      papel: 'gestor',
      ativo: true,
      matricula: '20261451'
    },
    {
      id: 2,
      nome: 'Bruno Silv',
      email: 'bruno@empresa.com',
      senhaHash:
        '$2b$12$5S9LDbR3FznMAsZY5P..2OKE932dOHeVvGrmlfklgquClbkKgUidC',
      papel: 'solicitante',
      ativo: true,
      matricula: '20261453'
    },
    {
      id: 3,
      nome: 'Carla Pereira',
      email: 'carla@empresa.com',
      senhaHash:
        '$2b$12$5S9LDbR3FznMAsZY5P..2OKE932dOHeVvGrmlfklgquClbkKgUidC',
      papel: 'auditor',
      ativo: true,
      matricula: '20261457'
    },
    {
      id: 4,
      nome: 'Carlos Martins',
      email: 'carlos@empresa.com',
      senhaHash:
        '$2b$12$5S9LDbR3FznMAsZY5P..2OKE932dOHeVvGrmlfklgquClbkKgUidC',
      papel: 'gestor',
      ativo: true,
      matricula: '20261458'
    }
  ];

  buscarPorEmail(email: string) {
    return this.usuarios.find((usuario) => usuario.email === email);
  }
}

// https://www.jwt.io/
// Site para verificar o conteúdo do JWT, decodificar e validar a assinatura.