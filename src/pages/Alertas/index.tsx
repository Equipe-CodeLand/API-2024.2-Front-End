import React, { useEffect, useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { Sidebar } from '../../components/sidebar/sidebar';
import AlertaCard, { Alerta } from '../../components/alertaCard';
import './style.css';

const Alertas: React.FC = () => {
  const [alerts, setAlerts] = useState<{ estacaoId: number, alerts: Alerta[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Função para buscar os alertas do backend
  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:5000/alertas'); // Substitua pela sua rota correta
      const data = await response.json();

      if (data.success) {
        // Agrupando os alertas por estação
        const groupedAlerts = data.alerta.reduce((acc: any, alerta: Alerta) => {
          const estacaoId = alerta.localEstacao; // Use estacaoId para agrupar
          if (!acc[estacaoId]) {
            acc[estacaoId] = { estacaoId, alerts: [] };
          }
          acc[estacaoId].alerts.push(alerta);
          return acc;
        }, {});

        setAlerts(Object.values(groupedAlerts)); // Converte o objeto em um array
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erro ao buscar alertas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container'>
      <Sidebar />
      <div> 
        <div className="title-box">
          <h2 className='title-text'>Alertas cadastrados</h2>
        </div>
        <div className="content">
          {alerts.map((location, index) => (
            <div className="alert-container" key={index}>
              <h2 className="small-title-text">Local: {location.estacaoId}</h2>

              {location.alerts.length === 0 ? (
                <p className="no-alert-text">Sem alertas na estação</p>
              ) : (
                location.alerts.map((alerta) => (
                  <AlertaCard alerta={alerta} key={alerta.id} />
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alertas;
