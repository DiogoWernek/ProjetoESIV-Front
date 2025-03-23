import { useState, ChangeEvent, FormEvent } from "react";
import api from "./services/api.ts"; // Certifique-se de que o caminho está correto

// Definição da interface para o formulário
interface FormData {
    name: string;
    email: string;
    password: string;
}

function App() {
    // Definindo o estado com tipagem
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: ""
    });

    const [mensagem, setMensagem] = useState<string>("");

    // Tipagem para eventos de input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Tipagem para evento de formulário
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post<{ mensagem: string }>("/usuarios", formData);
            setMensagem(response.data.mensagem);
            setFormData({ name: "", email: "", password: "" });
        } catch (error) {
            setMensagem("Erro ao cadastrar usuário");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Cadastrar Usuário</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name"
                    placeholder="Nome" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email"
                    placeholder="E-mail" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Senha" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Cadastrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default App;
