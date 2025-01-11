import { useState } from "react"

function Produto() {

    const [ativo, setAtivo] = useState(false);

    return (
        <>
            <h1>Produto</h1>
            <button className="btn btn-dark"
                onClick={()=>{
                    setAtivo(!ativo)
                }}
            >
                Exibe
            </button>

            {ativo ? <h3>olá mundo</h3> : ""}
        </>

    )
}

export default Produto