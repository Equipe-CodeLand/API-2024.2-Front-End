import { useEffect, useState } from "react";

import { Sidebar } from "../../components/sidebar/sidebar";
import InputCampo from "../../interface/InputCampo";
import { Forms } from "../../components";

/* Interface com os dados que serão enviados ao back-end */
interface formsDados {
    nome?: string,
    macAddress?: string,
    parametros?: string[],
    cep?: string,
    rua?: string,
    numero?: number,
    bairro?: string,
    cidade?: string
}

const CadastroEstacao: React.FC = () => {

    const [formDados, setFormDados] = useState<formsDados | undefined>()
    const [erro, setErro] = useState(false)
    const [parametros, setParametros] = useState<string[] | undefined>(undefined);

    /* Lista dos inputs do forms */
    const inputs: InputCampo[] = [
        { label: 'Nome', type: 'text', name: 'Nome', placeholder: 'Digite o nome', height: 30, width: 400 },
        { label: 'MAC Address (UID)', type: 'text', name: 'MacAddress', placeholder: 'Digite o MAC Address', height: 30, width: 400  },
        { label: 'Parâmetros', type: 'select', name: 'Parametros', placeholder: 'Selecione um parâmetro', options: parametros, height: 30, width: 400  },
        { label: 'CEP', type: 'text', name: 'Cep', placeholder: 'Digite o cep', height: 30, width: 400  },
        { label: 'Bairro', type: 'text', name: 'Bairro', placeholder: 'Digite o bairro', height: 30, width: 400  },
        { label: 'Cidade', type: 'text', name: 'Cidade', placeholder: 'Digite a cidade', height: 30, width: 400  },
        { label: 'Rua', type: 'text', name: 'Rua', placeholder: 'Digite a Rua', height: 30, width: 400  },
        { label: 'Número', type: 'number', name: 'Numero', placeholder: 'Digite o número', height: 30, width: 400  }
    ];

    useEffect(() => {
        /* isso aqui será susbtituido por uma busca no back-end */
        let parametro = ["temperatura", "umildade", "carisma", 'simpatia']
        setParametros(parametro)
    }, [])

    /* Esta função verifica se os campos estão preenchidos, caso não, envia um alerta,
    caso sim, envia ao back*/
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        inputs.map(input => {
            if (input.value === "" || input.value === undefined) {
                setErro(true)
            }
        })
        if (erro === false) {
            console.log("Isto sera enviado ao backend" + formDados); 
        }
        else {
            alert("Todos os campos são obrigatórios!")
            setErro(false)
        }
    }

    /* Esta função atualiza os dados do objeto formDados conforme o usuário preenche o forms */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDados({
            ...formDados,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <Sidebar /> {/* Adicionar Sidebar */}
            {/* Renderiza o componente do forms e envia as funções citadas anteriormente */}
            <Forms titulo="Cadastro de Estação" inputs={inputs} handleSubmit={handleSubmit} handleChange={handleChange} />
        </div>
    )
}

export default CadastroEstacao