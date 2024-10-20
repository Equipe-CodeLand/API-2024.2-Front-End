export interface Notificacao {
    id?: string;
    alertaId: string;
    dataNotificacao: Date;
    mensagemAlerta: string;
    parametroId: string;
    estacaoId: string;
}