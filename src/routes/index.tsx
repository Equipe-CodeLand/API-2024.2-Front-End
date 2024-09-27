import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroEstacao from "../pages/CadastroEstação/cadastroEstacao";
import DropdownUsuario from "../pages/DropdownUsuario";
import Notificacoes from "../pages/Notificações";
import '../globalCss/index.css'
import Home from "../pages/Home/home";
import AprendaMais from "../pages/AprendaMais/aprendaMais";
import CadastroUsuario from "../pages/CadastroUsuario";
import CadastroParametro from "../pages/CadastroParametro";
import ParametrosEstação from "../pages/ParametrosEstacao";
import Parametros from "../pages/Parametros";
import Alertas from "../pages/Alertas";
// import ParametroTable from "../pages/Parametros";


export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/notificacoes' element={<Notificacoes />} />
                <Route path='/estacao/cadastro' element={<CadastroEstacao />} />
                <Route path='/estacao/parametros' element={<ParametrosEstação />} />
                <Route path='/usuarios' element={<DropdownUsuario />} />
                <Route path='/aprenda-mais' element={<AprendaMais />} />
                <Route path='/usuario/cadastro' element={<CadastroUsuario />} />
                <Route path='/parametro/cadastro' element={<CadastroParametro />} />
                <Route path='/parametros' element={<Parametros />} />
                <Route path='/alertas' element={<Alertas/>}/>
                {/* <Route path='parametrosTable' element={<ParametroTable/>}/> */}
            </Routes>
        </BrowserRouter>
    )
}