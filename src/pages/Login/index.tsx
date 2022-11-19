import { useState, useContext} from "react"

import { authContext } from "../../contexts/Auth"
import { BackgroundLogin, ContainerLogin, SectionLogin, FormButton, Title } from "./styles"
import { TextField, Button } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(authContext)

    function handleSubmitButtonClick() {
       login(email, password)
    }

    return(
        <SectionLogin>
            <ContainerLogin>
                <AccountCircleIcon className="account-icon" color="primary"/>

                <Title>Entrar</Title>

                <TextField className="textfield" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>

                <TextField className="textfield" label="Senha" variant="outlined" type='password' onChange={(e) => setPassword(e.target.value)}/>

                <FormButton type='button' onClick={handleSubmitButtonClick}>Entrar</FormButton>
                <Button href='/register'>Registrar</Button>
            </ContainerLogin>
            <BackgroundLogin/>
        </SectionLogin>

    )
}