import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import './style.css'
import Grafico from '../../components/grafico';

interface Station {
  local: string;
  parametros: string[];
  porcentage: string;
  descricao: string;
}

const ParametrosEstação: React.FC = () => {
  // Payload fictício
  const stations: Station[] = [
    {
      local: "Escola Elmano Ferreira Veloso",
      parametros: [
        "umidade", "Temperatura", "Pluviosidade"
      ],
      porcentage: "70%",
      descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi itaque nulla ea debitis quis. Laudantium voluptate possimus voluptates totam nemo, sunt rerum corporis deserunt saepe incidunt fugit ducimus nobis provident.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi itaque nulla ea debitis quis. Laudantium voluptate possimus voluptates totam nemo, sunt rerum corporis deserunt saepe incidunt fugit ducimus nobis provident."
    }
  ];

  const [selectedParametro, setSelectedParametro] = useState<string | null>("umidade");

  const handleParametroClick = (parametro: string) => {
    setSelectedParametro(parametro);
  };


  return (
    <div className='container'>
      <Navbar />
      {stations.map((stations, index) => (
        <div key={index} className="station">
          <div className="title-box">
            <h2 className='title-text'>{stations.local}</h2>
            <p className="small-tittle-text">selecione um parâmetro para ver os detalhes!</p>
          </div>

          <div className="content">
            <div className="parameter-estacao-container">
              {stations.parametros.map((parametro, index) => (
                <div
                  key={index}
                  className={`parameter ${parametro === selectedParametro ? 'selected' : ''}`}
                  onClick={() => handleParametroClick(parametro)}
                >
                  <p>{parametro}</p>
                </div>
              ))}
            </div>

            <div className="middle-container">
              <div className="description-container">

                <div className="description-title">
                  <h2 className='title-text'>Descrição</h2>

                  <div className="porcentage">
                    <h3>
                      Nível de {selectedParametro ? selectedParametro.charAt(0).toUpperCase() + selectedParametro.slice(1) : ''}:
                      <span>
                        {stations.porcentage}
                      </span>
                    </h3>
                  </div>

                </div>

                <p className="text">{stations.descricao}</p>
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
      ))}
    </div>
  );
};

export default ParametrosEstação;

