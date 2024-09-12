import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEstacao from "../pages/CadastroEstação/cadastroEstacao";
import DropdownUsuario from "../pages/DropdownUsuario";
import Notificacoes from "../pages/Notificações";
import '../globalCss/index.css'
import Home from "../pages/Home/home";
import Alertas from "../pages/Alertas";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/notificacoes' element={<Notificacoes />} />
                <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
                <Route path='/usuarios' element={<DropdownUsuario />} />
                <Route path='/alertas' element={<Alertas />} />
            </Routes>
        </BrowserRouter>
    )
}