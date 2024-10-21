import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/sidebar/sidebar';
import './style.css';
import Grafico from '../../components/grafico';
import { useLocation, useNavigate } from 'react-router-dom';
import { Estacao } from '../../interface/estacao';
import { api, serviceApi } from '../../config';
import BackArrow from '../../assets/back-arrow.png';

const ParametrosEstacao: React.FC = () => {
  const location = useLocation();
  const [station, setStation] = useState<Estacao | null>(null);
  const [parametros, setParametros] = useState<any[]>([]);
  const [selectedParametro, setSelectedParametro] = useState<any | null>(null); // Altere o tipo para armazenar o objeto do parâmetro
  const [selectedSigla, setSelectedSigla] = useState<string | null>(null);
  const [dadosPython, setDadosPython] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const stationData = location.state?.estacao as Estacao;

        if (stationData) {
          setStation(stationData);
          console.log('Estação atualizada com os dados do state:', stationData);

          if (stationData.parametros && stationData.parametros.length > 0) {
            const response = await api.get('/parametros', {
              params: { ids: stationData.parametros } // Enviando os IDs como parâmetros
            });

            const fetchedParametros = response.data;

            const filteredParametros = fetchedParametros.filter((parametro: any) =>
              stationData.parametros.includes(parametro.id) // Certifica-se de que o ID do parâmetro está na lista da estação
            );

            setParametros(filteredParametros);
            console.log('Parâmetros filtrados recebidos:', filteredParametros);

            const pythonResponse = await serviceApi.get(`/parametrosEstacao/${stationData.uid}`);
            console.log('Dados recebidos do serviço em Python:', pythonResponse.data);
            setDadosPython(pythonResponse.data.parametros); // Armazenar dados no estado

            if (filteredParametros.length > 0) {
              setSelectedParametro(filteredParametros[0]);
              setSelectedSigla(filteredParametros[0].sigla);
              console.log('Primeiro parâmetro selecionado automaticamente:', filteredParametros[0].nome, 'Sigla:', filteredParametros[0].sigla);
            }
          }
        } else {
          console.error('Estação não encontrada no state.');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados da estação:', error);
      }
    };
    fetchStationData();
  }, [location.state]);

  const handleParametroClick = (parametro: any) => {
    setSelectedParametro(parametro);
    setSelectedSigla(parametro.sigla);
    console.log('Parâmetro selecionado:', parametro.nome, 'Sigla:', parametro.sigla);
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className="station">
        <div className="title-box">
          <h2 className='title-text'>{station?.nome || 'Estação não encontrada'}</h2>
        </div>

        <div className="content">
          <div className="middle-container">
            <div className="parameter-estacao-container">
              <div className="back-button" onClick={() => navigate('/estacoes')}>
                <img src={BackArrow} alt="voltar" className='back-arrow' />
                <span>Voltar</span>
              </div>
              <div className='parameter-content-station'>
                {parametros.length ? (
                  parametros.map((parametro, index) => (
                    <div
                      key={index}
                      className={`parameter ${parametro.nome === selectedParametro?.nome ? 'selected' : ''}`}
                      onClick={() => handleParametroClick(parametro)}
                    >
                      <p>{parametro.nome}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-parameter-text">Nenhum parâmetro disponível para esta estação.</p>
                )}
              </div>
            </div>
            <div className="middle-container-info">
              <div className="description-container">
                <div className="description-title">
                  <h2 className='title-text'>Descrição</h2>
                </div>
                <p className="text">{selectedParametro ? selectedParametro.descricao : 'Selecione um parâmetro para ver a descrição.'}</p>
              </div>

              <div className="graphs-container">
                {selectedSigla && (
                  <div className='graph'>
                    <Grafico nome={selectedParametro.nome} parametro={selectedSigla} dados={dadosPython} />
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
