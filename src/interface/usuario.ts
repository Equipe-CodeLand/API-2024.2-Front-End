export enum Perfil {
  Admin = 'Administrador',
  Leitor = 'Leitor',
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  cpf: string;
  perfil: string; // Vem como string do backend, depois mapeamos para o enum Perfil
  criadoEm?: string;
  atualizadoEm?: string;
}
