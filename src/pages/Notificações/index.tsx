import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import WarningIcon from '@mui/icons-material/Warning';
import './style.css';
import { api } from '../../config/index';
import { Notificacao } from '../../interface/notificacao';

const Notificacoes: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parametros, setParametros] = useState<{ [key: string]: string }>({});
  const [estacoes, setEstacoes] = useState<{ [key: string]: string }>({});
  const [alertas, setAlertas] = useState<{ [key: string]: string }>({});

  const [filtroEstacao, setFiltroEstacao] = useState('');
  const [filtroParametro, setFiltroParametro] = useState('');
  const [filtroMensagem, setFiltroMensagem] = useState('');

  const formatarDataHora = (dataStr: string) => {
    const [datePart, timePart] = dataStr.split(' ');
    const [dia, mes, ano] = datePart.split('/').map(Number);
    const [horas, minutos, segundos] = timePart.split(':').map(Number);

    const date = new Date(ano, mes - 1, dia, horas, minutos, segundos);

    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }

    const diaFormatado = String(date.getDate()).padStart(2, '0');
    const mesFormatado = String(date.getMonth() + 1).padStart(2, '0');
    const anoFormatado = date.getFullYear();

    const horasFormatadas = String(date.getHours()).padStart(2, '0');
    const minutosFormatados = String(date.getMinutes()).padStart(2, '0');
    const segundosFormatados = String(date.getSeconds()).padStart(2, '0');

    return `${diaFormatado}/${mesFormatado}/${anoFormatado} ${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
  };

  useEffect(() => {
    const fetchNotificacoes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/notificacoes');
        const data = await response.data;

        console.log('Dados recebidos:', data);

        if (Array.isArray(data)) {
          setNotificacoes(data);
          await fetchNomes(data);
        } else {
          console.error('A resposta da API não contém notificações válidas:', data);
          setError('Sem notificações cadastradas no momento.');
        }
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
        setError('Erro ao buscar notificações. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    const fetchNomes = async (notificacoes: Notificacao[]) => {
      const parametroIds = [...new Set(notificacoes.map(n => n.parametroId))];
      const estacaoIds = [...new Set(notificacoes.map(n => n.estacaoId))];
      const alertaIds = [...new Set(notificacoes.map(n => n.alertaId))];

      const [parametrosResponse, estacoesResponse, alertasResponse] = await Promise.all([
        api.get('/parametros', { params: { ids: parametroIds.join(',') } }),
        api.get('/estacoes', { params: { ids: estacaoIds.join(',') } }),
        api.get('/alertas', { params: { ids: alertaIds.join(',') } })
      ]);

      const parametrosData = parametrosResponse.data;
      const estacoesData = estacoesResponse.data;
      const alertasData = alertasResponse.data;

      const parametrosMap = parametrosData.reduce((acc: any, param: any) => {
        acc[param.id] = param.nome;
        return acc;
      }, {});

      const estacoesMap = estacoesData.reduce((acc: any, estacao: any) => {
        acc[estacao.id] = estacao.nome;
        return acc;
      }, {});

      const alertasMap = alertasData.reduce((acc: any, alerta: any) => {
        acc[alerta.id] = alerta.tipoAlerta;
        return acc;
      }, {});

      setParametros(parametrosMap);
      setEstacoes(estacoesMap);
      setAlertas(alertasMap);
    };

    fetchNotificacoes();
  }, []);

  const notificacoesFiltradas = notificacoes.filter(notificacao => {
    return (
      (filtroEstacao === '' || estacoes[notificacao.estacaoId].toLowerCase().includes(filtroEstacao.toLowerCase())) &&
      (filtroParametro === '' || parametros[notificacao.parametroId].toLowerCase().includes(filtroParametro.toLowerCase())) &&
      (filtroMensagem === '' || notificacao.mensagemAlerta.toLowerCase().includes(filtroMensagem.toLowerCase()))
    );
  });

  const notificacoesPorEstacao: { [key: string]: Notificacao[] } = {};
  notificacoesFiltradas.forEach((notificacao) => {
    const estacaoId = notificacao.estacaoId;
    if (!notificacoesPorEstacao[estacaoId]) {
      notificacoesPorEstacao[estacaoId] = [];
    }
    notificacoesPorEstacao[estacaoId].push(notificacao);
  });

  const getAlertaClass = (alertaId: string) => {
    const tipoAlerta = alertas[alertaId];
    if (tipoAlerta === 'Perigo') {
      return 'red';
    }
    return 'yellow';
  };

  return (
    <div className='container'>
      <Sidebar />
      <div>
        <div className="title-box">
          <h2 className='title-text' style={{paddingBottom: '10px'}}>Notificações</h2>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="filter-container">
              <input
                className='input-full-size'
                type="text"
                placeholder="Filtrar por estação"
                value={filtroEstacao}
                onChange={e => setFiltroEstacao(e.target.value)}
              />
              <input
                className='input-full-size'
                type="text"
                placeholder="Filtrar por parâmetro"
                value={filtroParametro}
                onChange={e => setFiltroParametro(e.target.value)}
              />
              <input
                className='input-full-size'
                type="text"
                placeholder="Filtrar por mensagem"
                value={filtroMensagem}
                onChange={e => setFiltroMensagem(e.target.value)}
              />
            </div>
          </div>
          {loading ? (
            <p>Carregando notificações...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            Object.keys(notificacoesPorEstacao).length === 0 ? (
              <p className="no-notification-text">Nenhuma notificação cadastrada no momento.</p>
            ) : (
              Object.keys(notificacoesPorEstacao).map((estacaoId) => (
                <div key={estacaoId} className='content-box'>
                  <h2 className="small-title-text">
                    <strong>{estacoes[estacaoId]}</strong>
                  </h2>
                  {notificacoesPorEstacao[estacaoId].map((notificacao: Notificacao) => (
                    <div className={`notification-container ${getAlertaClass(notificacao.alertaId)}`} key={notificacao.id}>
                      <div className="notification-box">
                        <div className="notification-info">
                          <div className="icon-and-type">
                            <WarningIcon className={`icon ${getAlertaClass(notificacao.alertaId)}`} />
                          </div>
                          <p className={`text-type ${getAlertaClass(notificacao.alertaId)}`}>{notificacao.mensagemAlerta}</p>
                        </div>
                        <div className="notification-data">
                          <p className="date-text">
                            <strong>{formatarDataHora(notificacao.dataNotificacao)}</strong>
                          </p>
                          <p className="station-text">
                            <strong>{parametros[notificacao.parametroId]}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Notificacoes;
