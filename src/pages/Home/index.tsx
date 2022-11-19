import axios from 'axios'
import { useContext, useEffect, useState } from "react"

import { authContext } from "../../contexts/Auth"

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
        <>
            <h1>Bem vindo, {user.username}!</h1>
            <p>Seu saldo é {balance}</p>
            <a href='/transactions'>Transferências</a>
            <button onClick={handleLogoutClick}>Logout</button>
        </>
    )
}