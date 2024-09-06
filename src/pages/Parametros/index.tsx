import React from 'react'
import { Navbar } from '../../components'
import ParametroCard, { Parametro } from '../../components/parametro-card'
import './style.css'

// parâmetros hipoteticos para mapeamento
const parametrosData: Parametro[] = [
  {
    id: 1,
    nome: 'Pluviosidade',
    unidade: 'mm',
    fator: 0.25,
    offset: 1.4,
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quod, velit natus, veritatis sapiente reprehenderit rem delectus facilis totam ab pariatur dolore ut architecto, exercitationem iste! Nulla suscipit quidem sequi.'
  },
  {
    id: 2,
    nome: 'Temperatura',
    unidade: '°C',
    fator: 0.1,
    offset: 2.0,
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

const Parametros: React.FC = () => {

  return (
    <div className='container'>
      <Navbar />
      <div className="title-box">
        <h2 className='title-text'>Parâmetros</h2>
        <p className='text'>Aqui você pode ver todos os parâmetros!</p>
      </div>
      <div className="content">
        <div className="parameter-container">
          {parametrosData.map(parametro => (
            <ParametroCard key={parametro.id} parametro={parametro} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Parametros