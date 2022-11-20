import axios from 'axios'
import { useContext, useEffect, useState } from "react"
import { authContext } from "../../contexts/Auth"
import { ContainerBalance, ContainerAccount, ContainerHome, NavBar, Title, BalanceText, LogoutButton} from './styles'
import { Button } from "@mui/material"
import Paid from '@mui/icons-material/Paid'
import Logout from '@mui/icons-material/Logout'

export function HomePage() {
    const {user, logout} = useContext(authContext)
    const [balance, setBalance] = useState<number>(0)

    function handleLogoutClick() {
        logout()
    }

    useEffect(() => {
        if(!!user.accountId){
            axios.get(`http://localhost:3000/account/${user.accountId}`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then(result => {
                setBalance(result.data.balance)
            }).catch((error) => {
                if(error.response.status === 403) {
                    logout()
                }
            })
        }
    }, [user])

    return(
        <ContainerHome>
            <ContainerAccount>
                <Title>Bem vindo, {user.username}!</Title>  
                <ContainerBalance> 
                    <Paid color="primary" fontSize='large'/><BalanceText>{balance}</BalanceText>
                </ContainerBalance>
                <NavBar>
                    <Button href='/transactions'>Transferências</Button>
                    <LogoutButton onClick={handleLogoutClick}><Logout fontSize='small'/></LogoutButton>
                </NavBar>
            </ContainerAccount>
        </ContainerHome>
    )
}