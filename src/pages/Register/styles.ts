import styled from 'styled-components'

export const ContainerRegister = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .personadd {
        font-size: 5rem;
        margin-top: 1rem;
    }
`;

export const Title = styled.p`
    font-size: 2rem;
    font-weight: 400;
    line-height: 140%;
    color: #2a37a3;
`;

export const ContainerFormRegister = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .textfield{
        width: 20rem;
        margin: 1rem;
    }
`

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