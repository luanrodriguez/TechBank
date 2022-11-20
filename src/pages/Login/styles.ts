import styled from 'styled-components'
import backgroundLogin from "../../assets/images/background-login.jpg"

export const SectionLogin = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row; 
    background-color: #FFFFFF;
    margin: 0;
`;

export const ContainerLogin = styled.form`
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .textfield{
        width: 20rem;
        margin: 1rem;
    }

    .account-icon{
        font-size: 5rem;
        margin-bottom: 0.5rem;
    }
`;

export const BackgroundLogin = styled.div`
    width: 60%;
    height: auto;
    background-image: url(${backgroundLogin});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;    
`;

export const Title = styled.p`
    font-size: 2rem;
    font-weight: 400;
    line-height: 140%;
    color: #2a37a3;
`;

export const FormButton = styled.button`
    width: 20rem;
    height: 3rem;
    background-color: #2a37a3;
    color: #FFFFFF;
    border: none;
    border-radius: .75rem;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 140%;
    margin-bottom: 1rem;
`;

