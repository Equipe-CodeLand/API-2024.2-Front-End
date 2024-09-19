import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Link } from 'react-router-dom'; 
import ParametroCard, { Parametro } from '../../components/parametro-card';
import './style.css';

const Parametros: React.FC = () => {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchParametros = async () => {
    try {
      const response = await axios.get('http://localhost:5000/parametros'); // Atualize a URL
      console.log('Dados recebidos:', response.data); // Adicione este log para verificar os dados recebidos
      setParametros(response.data); // Ajuste conforme a estrutura dos dados
    } catch (err) {
      console.error('Erro ao buscar parâmetros:', err); // Mude para console.error para erros
      if (axios.isAxiosError(err) && err.response) {
        setError(`Erro ao buscar parâmetros: ${err.response.status} - ${err.response.statusText}`);
      } else {
        setError('Erro desconhecido ao buscar parâmetros.');
      }
    }
  };

  useEffect(() => {
    fetchParametros();
  }, []);

  const handleEdit = async (parametro: Parametro) => {
    try {
      await axios.put(`http://localhost:5000/parametro/${parametro.id}`, parametro);
      fetchParametros(); // Atualiza a lista após a edição
    } catch (err) {
      console.error('Erro ao atualizar parâmetro:', err);
      setError('Erro ao atualizar parâmetro.');
    }
  };

  return (
    <div className='container'>
      <Sidebar />
      <div className="title-box">
        <h2 className='title-text'>Parâmetros</h2>
        <p className='text'>Aqui você pode ver todos os parâmetros!</p>
      </div>
      <div className='adicionarParametro'>
        <Link to="/parametro/cadastro" className='btn'>Adicionar parâmetro</Link>
      </div>
      <div className="content">
        {error && <p className='error-text'>{error}</p>}
        <div className="parameter-container">
          {parametros.map(parametro => (
            <ParametroCard
              key={parametro.id}
              parametro={parametro}
              onEdit={handleEdit}
              onDelete={(id) => {
                axios.delete(`http://localhost:5000/parametro/${id}`)
                  .then(() => fetchParametros()) // Atualiza a lista após deletar
                  .catch(err => console.error('Erro ao deletar parâmetro:', err));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parametros;