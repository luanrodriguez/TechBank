import axios from 'axios'
import {useState, useContext } from 'react'
import { authContext } from '../../contexts/Auth'

export function RegisterPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useContext(authContext)

    function handleRegisterButtonClick() {
        axios.post('http://localhost:3000/user', {
            username,
            password
        }).then((result) => {
            login(username, password)
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <>
            <h1>Register</h1>
            <a href='/login'>Login</a>
            <form>
                <label>Escolha um nome de usuário:</label>
                <input onChange={(e) => setUsername(e.target.value)}/>
                <label>Digite uma senha:</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)}/>
                <button type='button' onClick={handleRegisterButtonClick}>Registrar</button>
            </form>
        </>

    )
}