import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import WarningIcon from '@mui/icons-material/Warning';
import './style.css';
import api from '../../config/index';
import { Notificacao } from '../../interface/notificacao';

const Notificacoes: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                  <h2 className="small-title-text">{notificacao.parametroId}</h2>
                  <div className="notification-box">
                    <div className="notification-info">
                      <div className="icon-and-type">
                        <WarningIcon className='icon yellow' />
                      </div>
                      <p className="text-type">{notificacao.mensagemAlerta}</p>
                    </div>
                    <div className="notification-data">
                      <p className="date-text">{notificacao.dataNotificacao}</p>
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