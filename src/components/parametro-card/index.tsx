import React from 'react';
import './style.css';

export interface Parametro {
  id: number;
  nome: string;
  unidade: string;
  fator: number;
  offset: number;
  descricao: string;
}

interface ParametroCardProps {
  parametro: Parametro;
}

const ParametroCard: React.FC<ParametroCardProps> = ({ parametro }) => {
  return (
    <details className="parameter-card">
      <summary className="parameter-card-header">
        <p className='text'>{parametro.nome}</p>
        <p className='text'>{parametro.unidade}</p>
        <p className='text'>{parametro.fator}</p>
        <p className='text'>{parametro.offset}</p>
        <img
          src="https://img.icons8.com/ios/50/000000/expand-arrow.png"
          alt="expand-arrow"
        />
      </summary>
      <div className="inside-box">
        <div className="information-box-row">
          <div className="information-box-item">
            <h4 className="text">ID: {parametro.id}</h4>
          </div>
        </div>

        <div className="information-box-row">
          <div className="information-box-item">
            <h4 className="text">Parâmetro: {parametro.nome}</h4>
          </div>
          <div className="information-box-item">
            <h4 className="text">Unidade: {parametro.unidade}</h4>
          </div>
        </div>

        <div className="information-box-row">
          <div className="information-box-item">
            <h4 className="text">Fator: {parametro.fator}</h4>
          </div>
          <div className="information-box-item">
            <h4 className="text">Offset: {parametro.offset}</h4>
          </div>
        </div>

        <div className="information-box-row">
          <div className="information-box-desc">
            <h4 className="text">Descrição:</h4>
            <p className='text'>{parametro.descricao}</p>
          </div>
        </div>

        <div className="box-btn">
          <button className="btn">Editar</button>
          <button className="btn">Deletar</button>
        </div>
      </div>
    </details>
  );
};

export default ParametroCard;
