import styled from 'styled-components'
import backgroundLogin from "../../assets/images/background-login.jpg"

export const ContainerHome = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url(${backgroundLogin});
`

export const ContainerAccount = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    height: 15rem;
    width: 25rem;
    border-radius: 8px;       
    padding: 1rem;
`

export const ContainerBalance = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
`

export const BalanceText = styled.span`
    font-size: 2rem;
`

export const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
`

export const Title = styled.p`
    font-size: 2rem;
    font-weight: 400;
    line-height: 140%;
    color: #2a37a3;
`;

export const LogoutButton = styled.button`
    background-color: #2a37a3;
    width: 3rem;
    color: #FFFFFF;
    border: none;
    border-radius: .75rem;
`;