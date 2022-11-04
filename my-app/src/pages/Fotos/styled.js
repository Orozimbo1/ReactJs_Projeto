import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 180px;
        height: 180px;
        margin: auto;
        background: #eee;
        border: 5px dashed ${colors.primaryColor};
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
    }

    img {
        width: 180px;
        height: 180px;
    }

    input {
        display: none;
    }
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;
