import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEstacao from "../pages/CadastroEstação/cadastroEstacao";
import DropdownExample from "../pages/DropdownExample";
import DropdownUsuario from "../pages/DropdownUsuario";
import Notificacoes from "../pages/Notificações";
import '../globalCss/index.css'
import Home from "../pages/Home/home";
import CadastroUsuario from "../pages/CadastroUsuario";
import CadastroParametros from "../pages/CadastroParametros";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/notificacoes' element={<Notificacoes />} />
                <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
                <Route path='/dropdown-exemplo' element={<DropdownExample />} />
                <Route path='/usuarios' element={<DropdownUsuario />} />
                <Route path='/cadastro/usuario' element={<CadastroUsuario />} />
                <Route path='/parametros/cadastro' element={<CadastroParametros />} />
            </Routes>
        </BrowserRouter>
    )
}