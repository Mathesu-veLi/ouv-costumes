import { primaryLightColor } from '@/assets/globalStyle';
import styled from 'styled-components';

export const ProductDiv = styled.div`
    margin-top: 7%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background-color: ${primaryLightColor};
    width: 70%;
    border-radius: 10px;

    img {
        border-radius: 50px;
        margin-right: 50px;
    }

    /*.about {
        margin: 50px 0 100px 0;
    }*/

    .about li {
        font-size: 1.2em;
        line-height: 2.2em;
    }

    .about h3 {
        text-align: center;
        color: #59dfff;
        font-weight: lighter;
        letter-spacing: 5px;
    }

    .about div * {
        margin: 10px;
    }

    .about button {
        padding: 12px 10px 12px 10px;
        width: 60%;
        border-radius: 10px;
        border: 0;
        font-size: 1.1em;
        letter-spacing: 1px;
        background: linear-gradient(to right, #21333f, #31434f);
        color: #fff;
    }

    #quantity {
        width: 55px;
        height: 30px;
        background-color: #2b3d41;
        color: #fff;
        padding: 5px;
    }
`;
