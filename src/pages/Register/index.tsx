import axios from 'axios'
import {useState, useContext } from 'react'
import { authContext } from '../../contexts/Auth'
import { TextField, Button } from "@mui/material"
import PersonAdd from '@mui/icons-material/PersonAdd';
import { ContainerFormRegister, ContainerRegister, FormButton, Title } from './styles'

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
        <ContainerRegister>
            <PersonAdd className="personadd" color="primary"/>
            <Title>Registro</Title>
            <Button href='/login'>Login</Button>
            <ContainerFormRegister>
                <TextField className='textfield' label="Usuário" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
                <TextField className='textfield' label="Senha" variant="outlined" type='password' onChange={(e) => setPassword(e.target.value)}/>
                <FormButton type='button' onClick={handleRegisterButtonClick}>Registrar</FormButton>
            </ContainerFormRegister>
        </ContainerRegister>
    )
}