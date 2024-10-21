import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './styles.css';
import Logo from '../../assets/Logo.png';
import AprendaMais from '../../assets/AprendaMais.png';
import Home from '../../assets/Home.png';
import Estacoes from '../../assets/Estacoes.png';
import Usuario from '../../assets/Usuario.png';
import Notificacoes from '../../assets/Notificacoes.png';
import Logout from '../../assets/logout.png';
import Parametros from '../../assets/Parametros.png';
import Menu from '../../assets/Menu.png';
import X from '../../assets/X.png';
import Alertas from '../../assets/Alerta.png';
import { isUserAdmin } from '../../pages/Login/privateRoutes';

interface SidebarLinkProps {
  label: string;
  href: string;
  icon?: string;
}

const links: SidebarLinkProps[] = [
  { label: 'Home', href: '/home', icon: Home },
  // { label: 'Dashboard', href: '/dashboard', icon: Dashboard },
  { label: 'Aprenda Mais', href: '/aprenda-mais', icon: AprendaMais },
  { label: 'Usuários', href: '/usuarios', icon: Usuario },
  { label: 'Parâmetros', href: '/parametros', icon: Parametros },
  { label: 'Estações', href: '/estacoes', icon: Estacoes },
  { label: 'Notificações', href: '/notificacoes', icon: Notificacoes },
  // { label: 'Relatórios', href: '/relatorios', icon: Relatorio },
  { label: 'Alertas', href: '/alertas', icon: Alertas },

];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="toggle-container">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <img src={isOpen ? X : Menu} alt="Toggle Icon" className="toggle-icon" />
        </button>
        {isOpen && (
          <Link to="/home">
            <img src={Logo} alt="Logo" className="sidebar-logo" />
          </Link>
        )}
      </div>
      <nav className="sidebar-nav">
        <ul>
          {links.map((link) => (
            <>
              {link.label == 'Usuários' ? (
                <>
                  {isUserAdmin() && (
                    <li key={link.href}>
                      <NavLink to={link.href} className="sidebar-link">
                        <img src={link.icon} alt={`${link.label} icon`} className="icon" />
                        <span className="label">{link.label}</span>
                      </NavLink>
                    </li>
                  )}
                </>
              ) : (
                <li key={link.href}>
                  <NavLink to={link.href} className="sidebar-link">
                    <img src={link.icon} alt={`${link.label} icon`} className="icon" />
                    <span className="label">{link.label}</span>
                  </NavLink>
                </li>
              )}
            </>
          ))}
          <li>
            <a onClick={handleLogout} className="sidebar-link">
              <img src={Logout} alt="Sair icon" className="icon" />
              <span className="label">Sair</span>
            </a>
          </li>
        </ul>
      </nav >
    </div >
  );
};