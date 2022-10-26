import styled from 'styled-components';

export const Titulo = styled.h1`
    color: ${(props) => (props.isRed ? 'red' : 'blue')};
    background-color: green;
    small {
        font-size: 12pt;
        margin-left: 15px;
    }
`;

export const Paragrafo = styled.p`
    font-size: 80pt;
    color: #a3a3a3;
`;
