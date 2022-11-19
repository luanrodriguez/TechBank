import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

interface userType {
    id: string,
    username: string,
    accountId: string,
    accessToken: string
}

interface authContextType {
    user: userType,
    login: (email: string, password: string) => void,
    logout: () => void
}


export const authContext = createContext<authContextType>({
    user: {
        username: '',
        accountId: '',
        id: '',
        accessToken: ''
    },
    login: () => {},
    logout: () => {}
})

export function AuthContext({children}: any) {
    const [user, setUser] = useState<userType>({
        username: '',
        accountId: '',
        id: '',
        accessToken: ''
    })
    const navigate = useNavigate()
    let token = ''

    useEffect(() => {
        const userCached = localStorage.getItem('user')

        if(userCached) {
            const parsedUser: userType = JSON.parse(userCached)
            setUser(parsedUser)
        }
    }, [])

    function login(email: string, password: string) {
        axios.post('http://localhost:3000/authenticate', {
            username: email,
            password: password
        }).then((result) => {
            token = result.data.token

            axios.get(`http://localhost:3000/user/${email}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((result) => {
                localStorage.setItem('user', JSON.stringify({...result.data, accessToken: token}))
                setUser({...result.data, accessToken: token})
                navigate('/')
            }).catch(() => console.log('error'))
        }).catch(() => console.log('error'))
    }

    function logout() {
        localStorage.removeItem('user')
        setUser({
            username: '',
            accountId: '',
            id: '',
            accessToken: ''
        })
        navigate('/login')
    }

    return (
        <authContext.Provider value={{user, login, logout}}>
            {children}
        </authContext.Provider>
    )
}