import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

export interface Parametro {
  id: number;
  nome: string;
  unidade: string;
  fator: number;
  offset: number;
  descricao: string;
}

export interface ParametroCardProps {
  parametro: Parametro;
  onEdit: (parametro: Parametro) => void;
  onDelete: (id: number) => void;
}

const ParametroCard: React.FC<ParametroCardProps> = ({ parametro, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(parametro);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValues(parametro);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/parametro/${parametro.id}`, editValues);
      onEdit(editValues); // Chama a função de edição passada como prop
      setIsEditing(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(`Erro ao atualizar parâmetro: ${err.response.status} - ${err.response.statusText}`);
      } else {
        console.error('Erro desconhecido ao atualizar parâmetro.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/parametro/${parametro.id}`);
      onDelete(parametro.id); // Chama a função de deleção passada como prop
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(`Erro ao deletar parâmetro: ${err.response.status} - ${err.response.statusText}`);
      } else {
        console.error('Erro desconhecido ao deletar parâmetro.');
      }
    }
  };

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
        {isEditing ? (
          <div className="edit-form">
            <div className="information-box-row">
              <div className="information-box-item">
                <label className="text">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={editValues.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="information-box-item">
                <label className="text">Unidade:</label>
                <input
                  type="text"
                  name="unidade"
                  value={editValues.unidade}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="information-box-row">
              <div className="information-box-item">
                <label className="text">Fator:</label>
                <input
                  type="number"
                  name="fator"
                  value={editValues.fator}
                  onChange={handleChange}
                />
              </div>
              <div className="information-box-item">
                <label className="text">Offset:</label>
                <input
                  type="number"
                  name="offset"
                  value={editValues.offset}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="information-box-row">
              <div className="information-box-desc">
                <label className="text">Descrição:</label>
                <textarea
                  name="descricao"
                  value={editValues.descricao}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="box-btn">
              <button className="btn" onClick={handleSave}>Salvar</button>
              <button className="btn" onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div>
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
              <button className="btn" onClick={handleEditClick}>Editar</button>
              <button className="btn" onClick={handleDeleteClick}>Deletar</button>
            </div>
          </div>
        )}
      </div>
    </details>
  );
};

export default ParametroCard;