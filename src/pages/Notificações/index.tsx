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

      const [parametrosResponse, estacoesResponse] = await Promise.all([
        api.get('/parametros', { params: { ids: parametroIds.join(',') } }),
        api.get('/estacoes', { params: { ids: estacaoIds.join(',') } })
      ]);

      const parametrosData = parametrosResponse.data;
      const estacoesData = estacoesResponse.data;

      const parametrosMap = parametrosData.reduce((acc: any, param: any) => {
        acc[param.id] = param.nome;
        return acc;
      }, {});

      const estacoesMap = estacoesData.reduce((acc: any, estacao: any) => {
        acc[estacao.id] = estacao.nome;
        return acc;
      }, {});

      setParametros(parametrosMap);
      setEstacoes(estacoesMap);
    };

    fetchNotificacoes();
  }, []);

  return (
    <div className='container'>
      <Sidebar />
      <div>
        <div className="title-box">
          <h2 className='title-text'>Notificações</h2>
        </div>
        <div className="content">
          {loading ? (
            <p>Carregando notificações...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            notificacoes.length === 0 ? (
              <p className="no-notification-text">Nenhuma notificação cadastrada no momento.</p>
            ) : (
              notificacoes.map((notificacao) => (
                <div className="notification-container" key={notificacao.id}>
                  <h2 className="small-title-text"><strong>{estacoes[notificacao.estacaoId]}</strong></h2>
                  <div className="notification-box">
                    <div className="notification-info">
                      <div className="icon-and-type">
                        <WarningIcon className='icon yellow' />
                      </div>
                      <p className="text-type">{notificacao.mensagemAlerta}</p>
                    </div>
                    <div className="notification-data">
                      <p className="date-text"><strong>{notificacao.dataNotificacao}</strong></p>
                      <p className="station-text"><strong>{parametros[notificacao.parametroId]}</strong></p>
                    </div>
                  </div>
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