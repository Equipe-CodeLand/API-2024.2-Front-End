import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './globalCss/index.css'
import Notificacoes from './pages/Notificações'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notificacoes' element={<Notificacoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
