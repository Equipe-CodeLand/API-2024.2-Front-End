import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEstacao from "../pages/CadastroEstação/cadastroEstacao";
import DropdownExample from "../pages/DropdownExample";
import DropdownUsuario from "../pages/DropdownUsuario";
import Notificacoes from "../pages/Notificações";
import Login from "../pages/Login/login";
import '../globalCss/index.css'
import Home from "../pages/Home/home";
import AprendaMais from "../pages/AprendaMais/aprendaMais";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/notificacoes' element={<Notificacoes />} />
                <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
                <Route path='/dropdown-exemplo' element={<DropdownExample />} />
                <Route path='/usuarios' element={<DropdownUsuario />} />
                <Route path='/aprenda-mais' element={<AprendaMais />} />
            </Routes>
        </BrowserRouter>
    )
}