import { useState } from "react";
import Menu from "../components/Menu";

function Turmas() {
    const [status, setStatus] = useState(true);

    
    return (
        <>
            <h1>Turmas</h1>
            <Menu />
            {status ? <h1>Meu status tá on!</h1> : ""}

            <button 
                onClick={()=>{
                   setStatus(!status) 
                }}
            >
                Fechar
            </button>
        </>
    )
}

export default Turmas;