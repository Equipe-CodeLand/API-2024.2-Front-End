import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notificacoes from "../pages/Notificações";
import '../globalCss/index.css';
import CadastroUsuario from "../pages/CadastroUsuario";
import CadastroParametro from "../pages/CadastroParametro";
import { DropdownEstacao } from "../pages/Estacao";
import ParametrosEstação from "../pages/ParametrosEstacao";
import Parametros from "../pages/Parametros";
import Alertas from "../pages/Alertas";
import CadastroAlerta from "../pages/CadastroAlerta";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CadastroEstacao from "../pages/CadastroEstação";
import AprendaMais from "../pages/AprendaMais";
import UsuarioTable from "../pages/Usuarios";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/notificacoes' element={<Notificacoes />} />
                <Route path='/estacoes' element={<DropdownEstacao />} />
                <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
                <Route path='/estacao/:id' element={<ParametrosEstação />} />
                <Route path='/usuarios' element={<UsuarioTable />} />
                <Route path='/aprenda-mais' element={<AprendaMais />} />
                <Route path='/usuario/cadastro' element={<CadastroUsuario />} />
                <Route path='/parametro/cadastro' element={<CadastroParametro />} />
                <Route path='/parametros' element={<Parametros />} />
                <Route path='/alertas' element={<Alertas />} />
                <Route path='/alerta/cadastro' element={<CadastroAlerta />} />
            </Routes>
        </BrowserRouter>
    );
}
