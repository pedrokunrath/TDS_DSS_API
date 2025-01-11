import { BrowserRouter, Route, Routes } from "react-router-dom"
import Alunos from "./pages/Alunos.jsx";
import Professores from "./pages/Professores.jsx";
import Turmas from "./pages/Turmas.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Alunos/>}></Route>
                    <Route  path="/alunos" element={<Alunos/>}></Route>
                    <Route path="/professores" element={<Professores/>}></Route>
                    <Route path="/turmas" element={<Turmas/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App