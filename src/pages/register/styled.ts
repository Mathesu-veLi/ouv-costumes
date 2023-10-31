import styled from 'styled-components';
import { primaryLightColor } from '../../config/colors';

export const Form = styled.form`
    border: 1px solid black;
    border-radius: 5px;
    background-color: ${primaryLightColor};
    padding: 20px;
    width: 33em;
    box-shadow: 5px 5px 10px 5px;

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
