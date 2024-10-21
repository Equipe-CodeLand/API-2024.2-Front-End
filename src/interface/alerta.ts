export interface Alerta {
    id: string;
    local: string;
    gravidade: string;
    descricao: string;
    valor: number;
    parametro: string;
    condicao: string;
    nomeParametro: string;
    nomeEstacao: string;
    estacaoId: string;
    parametroId: string;
}