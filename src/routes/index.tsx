import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEstacao from "../pages/CadastroEstação/cadastroEstacao";
import DropdownExample from "../pages/DropdownExample";
import DropdownUsuario from "../pages/DropdownUsuario";
import Notificacoes from "../pages/Notificações";
import '../globalCss/index.css'
import Home from "../pages/Home/home";
import AprendaMais from "../pages/AprendaMais/aprendaMais";
import CadastroUsuario from "../pages/CadastroUsuario";
import CadastroParametro from "../pages/CadastroParametro";
import ParametrosEstação from "../pages/ParametrosEstacao";
import Parametros from "../pages/Parametros";

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/notificacoes' element={<Notificacoes />} />
                <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
                <Route path='/estacao/parametros' element={<ParametrosEstação />} />
                <Route path='/dropdown-exemplo' element={<DropdownExample />} />
                <Route path='/usuarios' element={<DropdownUsuario />} />
                <Route path='/aprenda-mais' element={<AprendaMais />} />
                <Route path='/usuario/cadastro' element={<CadastroUsuario />} />
                <Route path='/parametro/cadastro' element={<CadastroParametro />} />
                <Route path='/parametros' element={<Parametros />} />
            </Routes>
        </BrowserRouter>
    )
}