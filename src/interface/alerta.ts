export interface Alerta {
    id: number;
    local: string;
    gravidade: string;
    descricao: string;
    valor: number;
    parametro: string;
    condicao: string;
    nomeParametro: string;
    nomeEstacao: string;
    estacaoId: number;
    parametroId: number;
}