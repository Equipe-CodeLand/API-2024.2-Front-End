import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Logo from '../../../public/images/Logo.png';
import AprendaMais from '../../assets/AprendaMais.png';
import Home from '../../assets/Home.png';
import Dashboard from '../../assets/Dashboard.png';
import Estacoes from '../../assets/Estacoes.png';
import Usuario from '../../assets/Usuario.png';
import Notificacoes from '../../assets/Notificacoes.png';
import Relatorio from '../../assets/Relatorio.png';
import Menu from '../../assets/Menu.png';
import X from '../../assets/X.png';

interface SidebarLinkProps {
  label: string;
  href: string;
  icon?: string;
}

const links: SidebarLinkProps[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Dashboard', href: '/dashboard', icon: Dashboard },
  { label: 'Aprenda Mais', href: '/aprenda-mais', icon: AprendaMais },
  { label: 'Estações', href: '/estacoes', icon: Estacoes },
  { label: 'Usuários', href: '/usuarios', icon: Usuario },
  { label: 'Notificações', href: '/notificacoes', icon: Notificacoes },
  { label: 'Relatórios', href: '/relatorios', icon: Relatorio },
];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="toggle-container">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <img src={isOpen ? X : Menu} alt="Toggle Icon" className="toggle-icon" />
        </button>
        {isOpen && (
          <Link to="/">
            <img src={Logo} alt="Logo" className="sidebar-logo" />
          </Link>
        )}
      </div>
      <nav className="sidebar-nav">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className="sidebar-link">
                <img src={link.icon} alt={`${link.label} icon`} className="icon" />
                <span className="label">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};