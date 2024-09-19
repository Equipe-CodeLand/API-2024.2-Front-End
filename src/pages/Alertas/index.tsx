import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { Sidebar } from '../../components/sidebar/sidebar';
import AlertaCard, {Alerta} from '../../components/alertaCard';
import './style.css';

const Alertas: React.FC = () => {
  const alerts: { local: string, alerts: Alerta[] }[] = [
    {
      local: "PIT - Parque de Inovação Tecnológica",
      alerts: [{
          id: 1,
          gravidade: "Atenção",
          descricao: "Umidade do ar muito baixa nessa área",
          valor: 35,
          parametro: "Umidade",
      }  
      ]
    },
    {
      local: "Fatec SJC",
      alerts: [
        {
          id: 2,
          gravidade: "Perigo",
          descricao: "Risco de deslizamento!! Saia do local imediatamente!",
          valor: 95,
          parametro: "Pluviosidade",
        },
        {
          id: 3,
          gravidade: "Atenção",
          descricao: "Pluviosidade elevada na região.",
          valor: 70,
          parametro: "Pluviosidade",
        },
        {
          id: 4,
          gravidade: "Atenção",
          descricao: "Altas temperaturas",
          valor: 40,
          parametro: "Temperatura",
        }
      ]
    },
    {
      local: "ESCOLA ELMANO FERREIRA VELOSO",
      alerts: []
    }
  ];

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
              <h2 className="small-title-text">{location.local}</h2>

              {location.alerts.length === 0 ? (
                <p className="no-alert-text">Sem alertas na região</p>
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
