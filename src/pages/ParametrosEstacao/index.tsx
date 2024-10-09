import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import './style.css';
import Grafico from '../../components/grafico';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../config';
import { Estacao } from '../../interface/estacao';

const ParametrosEstacao: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [station, setStation] = useState<Estacao | null>(null);
  const [selectedParametro, setSelectedParametro] = useState<string | null>("umidade");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStationParameters = async () => {
      try {
        const response = await api.get(`/parametro/estacao/${id}`);
        const stationsResponse = await api.get('/estacao');
        const stationFound = stationsResponse.data.find((station: Estacao) => station.id === id);

        if (stationFound) {
          setStation({ ...stationFound, parametros: response.data });
          setSelectedParametro(response.data[0].nome);
        } else {
          console.error(`Estação com ID ${id} não encontrada na lista de estações`);
        }
      } catch (error) {
        console.error('Erro ao buscar os parâmetros da estação:', error);
      }
    };

    fetchStationParameters();
  }, [id]);

  const handleParametroClick = (parametro: string) => {
    setSelectedParametro(parametro);
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className="station">
        <div className="title-box">

          <h2 className='title-text'>{station?.nome || 'Estação não encontrada'}</h2>
          <p className="small-tittle-text"></p>
        </div>

        <div className="content">
          <div className="middle-container">
            <div className="parameter-estacao-container">
              <div className="back-button" onClick={() => navigate('/estacoes')}>
                <img src={'../../assets/back-arrow.png'} alt="voltar" className='back-arrow' />
                <span>Voltar </span>
              </div>
              <div className='parameter-content-station'>
                {station?.parametros.length ? (
                  station.parametros.map((parametro, index) => (
                    <div
                      key={index}
                      className={`parameter ${parametro === selectedParametro ? 'selected' : ''}`}
                      onClick={() => handleParametroClick(parametro)}
                    >
                      <p>{parametro}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-parameter-text">Nenhum parâmetro disponível para esta estação.</p> // Mensagem quando não há parâmetros
                )}
              </div>
            </div>
            <div className="middle-container-info">
              <div className="description-container">
                <div className="description-title">
                  <h2 className='title-text'>Descrição</h2>
                  <div className="porcentage">
                    <h3>
                      {/* Nível de {selectedParametro ? selectedParametro.charAt(0).toUpperCase() + selectedParametro.slice(1) : ''}: */}
                      {/* <span>
                      {station?.porcentage || 'N/A'} 
                    </span> */}
                    </h3>
                  </div>
                </div>
                <p className="text">{selectedParametro ? `Descrição do parâmetro ${selectedParametro}` : 'Selecione um parâmetro para ver a descrição.'}</p> {/* Altere conforme necessário */}
              </div>

              <div className="graphs-container">
                {selectedParametro && (
                  <div className='graph'>
                    <Grafico parametro={selectedParametro} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParametrosEstacao;
