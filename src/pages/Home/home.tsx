import React from 'react';
import { Sidebar } from '../../components/sidebar/sidebar'; 
import './style.css'; 
import Logo_Icon from '../../../public/images/Logo_Icon.png';

const Home: React.FC = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <header className="header-home">
          <img src={Logo_Icon} alt="Logo" className="logo" />
          <h1 className="titulo">Bem-vindo!</h1>
        </header>
        <section className="intro">
          <p className="intro-text">
            O objetivo do projeto é o desenvolvimento de um sistema de coleta de dados de estações meteorológicas. 
            A plataforma deve receber as informações da estação meteorológica e, em caso de emergência, mostrar uma 
            notificação alertando a população.
          </p>
        </section>
        <div className="content">
          <div className="card">
            <h2 className="card-title">Gerenciamento de Estações</h2>
            <p className="card-text">Adicione, edite e remova estações meteorológicas.</p>
          </div>
          <div className="card">
            <h2 className="card-title">Monitoramento de Parâmetros</h2>
            <p className="card-text">Acompanhe os dados coletados em tempo real.</p>
          </div>
          <div className="card">
            <h2 className="card-title">Alertas e Notificações</h2>
            <p className="card-text">Receba notificações em caso de condições meteorológicas extremas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;