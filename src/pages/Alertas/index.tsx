import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import './style.css';
import { Alerta } from '../../interface/alerta';
import AlertaCard from '../../components/alertaCard';
import api from '../../config/index'

interface GroupedAlert {
  nomeEstacao: string;
  idEstacao: number;
  idParametro: number;
  alerts: Alerta[];
}

const Alertas: React.FC = () => {
  const [alerts, setAlerts] = useState<GroupedAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlertas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/alertas'); 
        const data = await response.data;

        console.log('Dados recebidos:', data);

        if (Array.isArray(data)) {
          // Agrupar alertas por estação
          const groupedAlerts: GroupedAlert[] = [];

          data.forEach((alerta: any) => {
            const estacao = groupedAlerts.find(loc => loc.idEstacao === alerta.estacaoId && loc.idParametro === alerta.parametroId);

            const formattedAlert = {
              id: alerta.id,
              gravidade: alerta.tipoAlerta === 'perigo' ? 'Perigo' : 'Atenção',
              descricao: alerta.mensagemAlerta,
              valor: alerta.valor,
              parametro: alerta.nomeParametro,
              condicao: alerta.condicao,
              local: alerta.local,
              nomeParametro: alerta.nomeParametro,
              nomeEstacao: alerta.nomeEstacao,
              estacaoId: alerta.estacaoId,
              parametroId: alerta.parametroId,
            };

            if (estacao) {
              estacao.alerts.push(formattedAlert);
            } else {
              groupedAlerts.push({
                nomeEstacao: alerta.nomeEstacao,
                idParametro: alerta.parametroId,
                idEstacao: alerta.estacaoId,
                alerts: [formattedAlert],
              });
            }
          });
          console.log('Alertas agrupados:', groupedAlerts);

          setAlerts(groupedAlerts);
        } else {
          console.error('A resposta da API não contém alertas válidos:', data);
          setError('Sem alertas cadastrados no momento.');
        }
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
        setError('Erro ao buscar alertas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlertas();
  }, []);

  const handleNewAlert = () => {
    window.location.href = '/alerta/cadastro';
  };

  const handleDelete = (id: number) => {
    const updatedAlerts = alerts.map(location => ({
      ...location,
      alerts: location.alerts.filter(alerta => alerta.id !== id),
    })).filter(location => location.alerts.length > 0);

    setAlerts(updatedAlerts);
  };

  const handleUpdate = (updatedAlerta: Alerta) => {
    const updatedAlerts = alerts.map(location => ({
      ...location,
      alerts: location.alerts.map(alerta =>
        alerta.id === updatedAlerta.id ? updatedAlerta : alerta
      ),
    }));

    setAlerts(updatedAlerts);
  };


  return (
    <div className='container'>
      <Sidebar />
      <div>
        <div className="title-box">
          <h2 className='title-text'>Alertas cadastrados</h2>
          <div className='new-alert-container'>
            <button className="btn" onClick={handleNewAlert}>
              + Novo Alerta
            </button>
          </div>
        </div>
        <div className="content">
          {loading ? (
            <p>Carregando alertas...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : (
            alerts.map((location, index) => (
              <div className="alert-container" key={index}>
                <h2 className="alert-title-text">{location.nomeEstacao}</h2>
                {location.alerts.length === 0 ? (
                  <p className="no-alert-text">Sem alertas na região</p>
                ) : (
                  location.alerts.map((alerta) => (
                    <AlertaCard alerta={alerta} key={alerta.id} idEstacao={location.idEstacao} idParametro={location.idParametro} onDelete={handleDelete} onUpdate={handleUpdate} />
                  ))
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Alertas;
