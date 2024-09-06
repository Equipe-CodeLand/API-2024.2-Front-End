import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/home'
import './globalCss/index.css'
import Notificacoes from './pages/Notificações'
import CadastroEstacao from './pages/CadastroEstação/cadastroEstacao'
import Parametros from './pages/Parametros'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notificacoes' element={<Notificacoes />} />
        <Route path='/parametros' element={<Parametros />} />
        <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
