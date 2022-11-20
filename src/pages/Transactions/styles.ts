import styled from "styled-components"
import backgroundLogin from "../../assets/images/background-login.jpg"

export const ContainerTransactions = styled.div`
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
    border-radius: 8px;       
    padding: 1rem;
`

export const ContainerBalance = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
`

export const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
`
export const Filters = styled.div`
    display: flex;
    justify-content: space-between;
`

export const ButtonFilters = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`

export const CustomFilters = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
`

export const Title = styled.p`
    font-size: 2rem;
    font-weight: 400;
    line-height: 140%;
    color: #2a37a3;
`;

export const ContainerTable = styled.div`
    height: 10rem;
    margin: 0.5rem 0;
    overflow: auto;

    table {
        border-collapse: collapse;
    }
    th {
        padding: 1rem;
        text-align: left;
        background-color: #2a37a3;
        color: #FFFFFF;
        width: 10rem;
    }
    td {
        border-top: 4px solid #FFF;
        padding: 1rem;
    }
`

export const Button = styled.button`
    background-color: #2a37a3;
    color: #FFFFFF;
    border: none;
    border-radius: .75rem;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 140%;
    margin-bottom: 1rem;
    height: 2rem;
    width: 8rem;
`;

export const ContainerMakeTransfer = styled.form`
    display: flex;
    flex-direction: column;
    border: 1px solid #2a37a3;
    border-radius: 8px;
    padding: 0.5rem;
`