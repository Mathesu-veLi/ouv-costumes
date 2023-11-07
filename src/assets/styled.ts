import styled from 'styled-components';
import { primaryLightColor } from './globalStyle';


export const Form = styled.form`
    border: 1px solid black;
    border-radius: 5px;
    background-color: ${primaryLightColor};
    padding: 20px;
    width: 33em;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.7);
    color: initial;
    h1 {
        font-size: 2em;
        margin-bottom: 1.2em;
    }

    input {
        padding: 1em;
    }

    label {
        font-size: 1.05em;
    }
`;
