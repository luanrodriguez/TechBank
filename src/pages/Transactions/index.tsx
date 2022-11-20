import axios from 'axios'
import { isSameDay, parseISO, format } from 'date-fns'
import { useState, useEffect, useContext } from 'react'
import { authContext } from '../../contexts/Auth'
import { 
    ButtonFilters,
    ContainerAccount, 
    ContainerTable, 
    ContainerTransactions, 
    CustomFilters, 
    Filters,
    Button, 
    NavBar,
    Title,
    ContainerMakeTransfer
} from './styles'

interface transactionsType {
    debitedAccount: {
        user: {
            username: string
        }
    },
    creditedAccount: {
        user: {
            username: string
        }
    },
    value: number,
    createdAt: string
}

export function TransactionsPage(){
    const [date, setDate] = useState('')
    const [value, setValue] = useState(0)
    const [creditedUsername, setCreditedUsername] = useState('')
    const [notFilteredState, setNotFilteredState] = useState<transactionsType[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState<transactionsType[]>([])
    const {user, logout} = useContext(authContext)


    function handleReceivedButtonClick() {
        const filteredTransactions = notFilteredState.filter((transaction) => transaction.creditedAccount.user.username === user.username)
        setFilteredTransactions(filteredTransactions)
    }

    function handleSentButtonClick() {
        const filteredTransactions = notFilteredState.filter((transaction) => transaction.debitedAccount.user.username === user.username)
        setFilteredTransactions(filteredTransactions)
    }

    function handleFilterButtonClick() {
        const parsedDate = parseISO(date)

        setFilteredTransactions((state) => {
            const filtrados = state.filter((transaction) => {
                console.log(parsedDate)
                console.log(parseISO(transaction.createdAt))
                return (
                    isSameDay(parsedDate, parseISO(transaction.createdAt))
                )
            })
            return filtrados
        })
    }

    function handleTransferButtonClick() {
        axios.post(`http://localhost:3000/transaction`, {
            debitedAccountId: user.accountId,
            creditedUsername: creditedUsername,
            value: value
        },
        {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            },
        }).then((result) => {
            console.log('success')
        }).catch((err) => {
            if(err.response.status === 403) {
                return logout()
            }
            console.log(err)
        })
    }

    useEffect(() => {
        if(!!user.accountId){
            axios.get(`http://localhost:3000/transaction/account/${user.accountId}`, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then((result) => {
                    setNotFilteredState(result.data)
                    setFilteredTransactions(result.data)
            }).catch((err) => {
                if(err.response.status === 403) {
                    logout()
                }
            })
        }
    }, [user])

    return(
        <ContainerTransactions>
            <ContainerAccount>
                <NavBar>
                    <Title>Transferências</Title>
                    <a href='/'>Home</a>
                </NavBar>

                <Filters>
                    <ButtonFilters>
                        <Button onClick={handleReceivedButtonClick}>Recebidos</Button>
                        <Button onClick={handleSentButtonClick}>Enviados</Button>
                        <Button onClick={()=>setFilteredTransactions(notFilteredState)}>Ambos</Button>
                    </ButtonFilters>

                    <CustomFilters>
                        <label htmlFor="date">Data</label>
                        <input type='date' id="date" onChange={(e) => setDate(e.target.value)} />
                        <Button onClick={handleFilterButtonClick}>Filtrar</Button>
                    </CustomFilters>
                </Filters>

                <ContainerTable>
                    <table>
                        <thead>
                            <tr>
                                <th>Envio</th>
                                <th>Recebimento</th>
                                <th>Valor</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(transactionInfo => {
                                return (
                                    <tr>
                                        <td>{transactionInfo.debitedAccount.user.username}</td>
                                        <td>{transactionInfo.creditedAccount.user.username}</td>
                                        <td>{transactionInfo.value}</td>
                                        <td>{format(parseISO(transactionInfo.createdAt), 'dd/MM/yyyy')}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </ContainerTable>
                
                <ContainerMakeTransfer> 
                    <label>Para quem quer transferir?</label>
                    <input onChange={(e) => setCreditedUsername(e.target.value)}/>
                    <br />
                    <label>Qual a quantia?</label>
                    <input type='number' onChange={(e) => setValue(Number(e.target.value))}/>
                    <br />
                    <Button type='button' onClick={handleTransferButtonClick}>Enviar</Button>
                </ContainerMakeTransfer>
            </ContainerAccount>
        </ContainerTransactions>
    )
}