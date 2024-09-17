export enum Perfil {
  Admin = 'Administrador',
  Leitor = 'Leitor',
}

export interface Usuario {
  id: number;
  nome: string;
  tipo: Perfil; 
  email: string;
  cpf: string;
  status: string;
}
