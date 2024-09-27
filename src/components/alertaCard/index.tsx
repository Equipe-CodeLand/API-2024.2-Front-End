import React, { useState } from 'react';
import './style.css';

export interface Alerta {
  id: number;
  localEstacao: string,
  gravidade: string;
  mensagemAlerta: string;
  valor: number;
  tipoParametro: string;
  condicao: string; // Adicionamos o campo condicao aqui.
}

interface AlertaCardProps {
  alerta: Alerta;
  
}

const AlertaCard: React.FC<AlertaCardProps> = ({ alerta }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editAlerta, setEditAlerta] = useState(alerta);

  // Condições disponíveis no dropdown
  const condicoes = ['<', '>', '==', '>=', '<='];

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditAlerta({ ...editAlerta, [name]: value });
  };

  const gravidadeClasse = alerta.gravidade === 'Atenção' ? 'atencao' : 'perigo';

  return (
    <details className={`alert-card ${gravidadeClasse}`}>
      <summary className="alert-card-header">
        <p className={`text-${gravidadeClasse.toLowerCase()}`}>
          {alerta.gravidade === 'Atenção' ? 'ATENÇÃO' : 'PERIGO'}: {isEditing ? (
            <input
              type="text"
              name="descrição"
              value={editAlerta.mensagemAlerta}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            alerta.mensagemAlerta
          )}
        </p>
        <img
          src="https://img.icons8.com/ios/50/000000/expand-arrow.png"
          alt="expand-arrow"
        />
      </summary>
      <div className="inside-box">
        <div className="information-box-row">
          <div className="information-box-item">
            <h4 className="text">MENSAGEM: </h4>
            {isEditing ? (
              <input
                type="text"
                name="mensagemAlerta"
                value={editAlerta.mensagemAlerta}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{alerta.mensagemAlerta}</span>
            )}
          </div>
        </div>

        <div className="information-box-row">
          <div className="information-box-item">
            <h4 className="text">CONDIÇÃO: </h4>
            {isEditing ? (
              <select
                name="condicao"
                value={editAlerta.condicao}
                onChange={handleInputChange}
                className="edit-input"
              >
                {condicoes.map((condicao, index) => (
                  <option key={index} value={condicao}>
                    {condicao}
                  </option>
                ))}
              </select>
            ) : (
              <span>{alerta.condicao}</span>
            )}
          </div>
          <div className="information-box-item">
            <h4 className="text">VALOR: </h4>
            {isEditing ? (
              <input
                type="number"
                name="valor"
                value={editAlerta.valor}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{alerta.valor}</span>
            )}
          </div>
        </div>

        <div className="information-box-row">
          <div className="information-box-item">
            <h4 className="text">PARÂMETRO: </h4>
            {isEditing ? (
              <input
                type="text"
                name="parametro"
                value={editAlerta.tipoParametro}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span>{alerta.tipoParametro}</span>
            )}
          </div>
        </div>

        <div className="box-btn">
          <button className="btn" onClick={handleEditClick}>
            {isEditing ? 'Salvar' : 'Editar'}
          </button>
          {!isEditing && (
            <button className="btn" >
              Excluir
            </button>
          )}
          {isEditing && (
            <button className="btn" onClick={handleEditClick}>
              Cancelar
            </button>
          )}
        </div>
      </div>
    </details>
  );
};

export default AlertaCard;
