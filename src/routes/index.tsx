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
import { DropdownEstacao } from "../pages/Estacao/estacao";
import Alertas from "../pages/Alertas";
import DropdownExample from "../pages/DropdownExample";
import CadastroAlerta from "../pages/CadastroAlerta/cadastroAlerta";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/notificacoes' element={<Notificacoes />} />
                <Route path='/estacoes' element={<DropdownEstacao />} />
                <Route path='/estacoes/cadastro' element={<CadastroEstacao />} />
                <Route path='/dropdown-exemplo' element={<DropdownExample />} />
                <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
                <Route path='/usuarios' element={<DropdownUsuario />} />
                <Route path='/aprenda-mais' element={<AprendaMais />} />
                <Route path='/usuario/cadastro' element={<CadastroUsuario />} />
                <Route path='/parametro/cadastro' element={<CadastroParametro />} />
                <Route path='/alertas' element={<Alertas/>}/>
                <Route path='/alerta/cadastro' element={<CadastroAlerta/>}/>
            </Routes>
        </BrowserRouter>
    )
}