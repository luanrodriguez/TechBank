import axios from 'axios'
import { isSameDay, parseISO } from 'date-fns'
import { useState, useEffect, useContext } from 'react'
import { authContext } from '../../contexts/Auth'

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
    const [radioButtonState, setRadioButtonState] = useState('')
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

        if(radioButtonState === 'debited') {
            setFilteredTransactions(notFilteredState.filter((transaction) => {
                return(
                    transaction.debitedAccount.user.username === user.username &&
                    isSameDay(parseISO(transaction.createdAt), parsedDate)
                )
            }))
        } else if(radioButtonState === 'credited') {
            setFilteredTransactions(notFilteredState.filter((transaction) => {
                return(
                    transaction.creditedAccount.user.username === user.username &&
                    isSameDay(parseISO(transaction.createdAt), parsedDate)
                )         
            }))
        } else {
            setFilteredTransactions(notFilteredState.filter((transaction) => {
                return(
                    isSameDay(parseISO(transaction.createdAt), parsedDate)
                )
            }))
        }
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
        <>
            <h1>Transactions</h1>
            <a href='/'>Home</a>
            <button onClick={handleReceivedButtonClick}>Recebidos</button>
            <button onClick={handleSentButtonClick}>Enviados</button>

            
            <label htmlFor="credited">Recebidos</label>
            <input type="radio" id="credited" value="credited" name="transfer" onChange={(e) => setRadioButtonState(e.target.value)} />
            <label htmlFor="debited">Enviados</label>
            <input type="radio" id="debited" value="debited" name="transfer" onChange={(e) => setRadioButtonState(e.target.value)} />
            <label htmlFor="both">Ambos</label> 
            <input type="radio" id="both" value="both" name="transfer" onChange={(e) => setRadioButtonState(e.target.value)} />
            <label htmlFor="date">Data</label>
            <input type='date' id="date" onChange={(e) => setDate(e.target.value)} />
            <button onClick={handleFilterButtonClick}>Filtrar</button>

            {filteredTransactions.map(transactionInfo => {
                return (
                    <div>
                        <p>{transactionInfo.creditedAccount.user.username}</p>
                        <p>{transactionInfo.debitedAccount.user.username}</p>
                        <p>{transactionInfo.value}</p>
                        <p>{transactionInfo.createdAt}</p>
                    </div>
                )
            })}
            <form>
                <label>Para quem quer transferir?</label>
                <input onChange={(e) => setCreditedUsername(e.target.value)}/>
                <label>Qual a quantia?</label>
                <input type='number' onChange={(e) => setValue(Number(e.target.value))}/>
                <button type='button' onClick={handleTransferButtonClick}>Enviar</button>
            </form>
        </>
    )
}