import { useEffect, useState } from "react";
import axios from "axios";
import Titulo from "./Titulo.jsx";
import "./App.css";

const Api = axios.create({
    baseURL: "http://localhost:8080/"
});

function App() {
    const [contador, setContador] = useState(1);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [user, setuser] = useState([]);

    useEffect(() => {
        Api.get("aluno").then((response) => {
            console.log(response.data);
            setuser(response.data);
        });
    }, []);

    const handleSave = () => {
        const user = { nome, email };
        Api.post("users", user).then((response) => {
            setNome("");
            setEmail("");
        });
    };

    return (
        <>
            <Titulo />
            <h2>{contador}</h2>
            <button onClick={() => setContador(contador + 1)}>+</button>
            <button onClick={() => setContador(contador - 1)}>-</button>

            <h1>Cadastro</h1>

            <ol>
                {user.map((item, index) => (
                    <li key={index}>{item.nome}</li>
                ))}
            </ol>

            {nome} - {email}
            <div>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleSave}>Salvar</button>
            </div>
        </>
    );
}

export default App;