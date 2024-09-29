import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import AlertaCard, { Alerta } from '../../components/alertaCard';

import './style.css';

const Alertas: React.FC = () => {
  const [alerts, setAlerts] = useState<{ nomeEstacao: string; idEstacao: number, idParametro: number, alerts: Alerta[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlertas = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await fetch('http://localhost:5000/alertas'); // ajuste a URL conforme necessário
        const data = await response.json();        

        console.log('Dados recebidos:', data);

        if (data.success && Array.isArray(data.alertas)) {
          // Agrupar alertas por estação
          const groupedAlerts: { nomeEstacao: string; idEstacao: number, idParametro: number, alerts: Alerta[] }[] = [];

          data.alertas.forEach((alerta: any) => {
            const estacao = groupedAlerts.find(loc => loc.nomeEstacao === alerta.nomeEstacao);
            
            const formattedAlert = {
              id: alerta.id,
              gravidade: alerta.tipoAlerta === 'perigo' ? 'Perigo' : 'Atenção',
              descricao: alerta.mensagemAlerta,
              valor: alerta.valor,
              parametro: alerta.nomeParametro,
              condicao: alerta.condicao,
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
          setError('Erro: A resposta da API não contém alertas válidos.');
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
          <button className="new-alert-button" onClick={handleNewAlert}>
            + Novo Alerta
          </button>
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
                    <AlertaCard alerta={alerta} key={alerta.id} idEstacao={location.idEstacao}  idParametro={location.idParametro} onDelete={handleDelete} onUpdate={handleUpdate} />
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
