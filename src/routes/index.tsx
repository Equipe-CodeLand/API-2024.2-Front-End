import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEstacao from "../pages/CadastroEstação/cadastroEstacao";
import DropdownUsuario from "../pages/DropdownUsuario";
import Notificacoes from "../pages/Notificações";
import Login from "../pages/Login/login";
import '../globalCss/index.css'
import Home from "../pages/Home/home";
import AprendaMais from "../pages/AprendaMais/aprendaMais";
import CadastroUsuario from "../pages/CadastroUsuario";
import CadastroParametro from "../pages/CadastroParametro";
import ParametroTable from "../pages/Parametros";
import Alertas from "../pages/Alertas";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/notificacoes' element={<Notificacoes />} />
                <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
                <Route path='/usuarios' element={<DropdownUsuario />} />
                <Route path='/aprenda-mais' element={<AprendaMais />} />
                <Route path='/usuario/cadastro' element={<CadastroUsuario />} />
                <Route path='/parametro/cadastro' element={<CadastroParametro />} />
                <Route path='/alertas' element={<Alertas/>}/>
                <Route path='/parametros' element={<ParametroTable/>}/>
            </Routes>
        </BrowserRouter>
    )
}