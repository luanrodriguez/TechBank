import { useState, useContext} from "react"

import { authContext } from "../../contexts/Auth"

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(authContext)

    function handleSubmitButtonClick() {
       login(email, password)
    }

    return(
        <>
            <form>
                <label>Email:</label>
                <input onChange={(e) => setEmail(e.target.value)}/>

                <label>Senha:</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)}/>

                <button type='button' onClick={handleSubmitButtonClick}>Logar</button>
            </form>
            <a href='/register'>Registrar</a>
        </>

    )
}