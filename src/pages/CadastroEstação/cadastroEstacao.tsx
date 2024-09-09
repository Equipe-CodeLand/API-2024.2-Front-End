import { useEffect, useState } from "react";
import InputField from "../../interface/InputField";
import { Form } from "../../components";

const CadastroEstacao: React.FC = () => {

    const [erro, setErro] = useState(false)
    const [parametros /*, setParametros*/] = useState(["umidade", "temperatura"])

    const inputs: InputField[] = [
        { label: 'Nome', type: 'text', name: 'Nome', value: '', placeholder: 'Digite o nome' },
        { label: 'MAC Address (UID)', type: 'text', name: 'MacAddress', value: '', placeholder: 'Digite o MAC Address' },
        { label: 'Parâmetros', type: 'select', name: 'Parametros', value: '', placeholder: 'Selecione um parâmetro', options: parametros },
        { label: 'CEP', type: 'text', name: 'Cep', value: '', placeholder: 'Digite o cep' },
        { label: 'Rua', type: 'text', name: 'Rua', value: '', placeholder: 'Digite a Rua' },
        { label: 'Número', type: 'text', name: 'Numero', value: '', placeholder: 'Digite o número' },
        { label: 'Bairro', type: 'text', name: 'Bairro', value: '', placeholder: 'Digite o bairro' },
        { label: 'Cidade', type: 'text', name: 'Cidade', value: '', placeholder: 'Digite a cidade' }
    ];

    // let parametro = ["umidade", "temperatura"]
    // setParametros(parametro)
    useEffect(() => {
    }, [])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        inputs.map(input => {
            if (input.value === "") {
                setErro(true)
            }
        })
        if (erro) {
            alert("Todos os campos são obrigatórios!")
        }
        else {
            //enviar ao back-end
        }
    }

    return (
        <div>
            <Form titulo="Cadastro de Estação" inputs={inputs} handleSubmit={handleSubmit} />
        </div>
    )
}

export default CadastroEstacao