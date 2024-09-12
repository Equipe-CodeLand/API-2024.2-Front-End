import React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { Sidebar } from '../../components/sidebar/sidebar';
import './style.css';

const Alertas: React.FC = () => {
  // Payload fictício para alertas
  const alerts = [
    {
      local: "PIT - Parque de Inovação Tecnológica",
      alerts: [
        {
          gravidade: "Atenção",
          descricao: "Umidade do ar muito baixa nessa área"
        }
      ]
    },
    {
      local: "Fatec SJC",
      alerts: [
        {
          gravidade: "Perigo",
          descricao: "Risco de deslizamento!! Saia do local imediatamente!",
        },
        {
          gravidade: "Atenção",
          descricao: "Pluviosidade elevada na região."
        },
        {
          gravidade: "Atenção",
          descricao: "Altas temperaturas"
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
      <div style={{ marginLeft: '60px' }}> {/* Adicionar margem à esquerda */}
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
                location.alerts.map((alert, idx) => (
                  <div className="alert-box" key={idx}>
                    <div className="alert-info">
                      <div className="icon-and-type">
                        <WarningIcon className={`icon ${alert.gravidade === 'Perigo' ? 'red' : 'yellow'}`} />
                        <p className={`type-text ${alert.gravidade === 'Perigo' ? 'red' : 'yellow'}`}>{alert.gravidade}: </p>
                      </div>
                      <p className="">{alert.descricao}</p>
                    </div>
                  </div>
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
