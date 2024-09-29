import React from 'react'
import { Sidebar } from '../../components/sidebar/sidebar'
import WarningIcon from '@mui/icons-material/Warning';
import './style.css'

const Notificacoes: React.FC = () => {
  return (
    <div className='container'>
      {/* <Navbar /> */}
      <Sidebar />
      <div>
        <div className="title-box">
          <h2 className='title-text'>Notificações</h2>
        </div>
        <div className="content">
          <div className="notification-container">
            <h2 className="small-title-text">PIT - Parque de Inovação tecnológica</h2>

            <div className="notification-box">
              <div className="notification-info">
                <div className="icon-and-type">
                  <WarningIcon className='icon yellow' />
                </div>
                <p className="text-type">Umidade do ar muito baixa nesta área.</p>
              </div>
              <div className="notification-data">
                <p className="date-text">Hoje, 18/03/2024</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Notificacoes