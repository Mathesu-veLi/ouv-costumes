import { primaryLightColor } from '@/assets/globalStyle';
import styled from 'styled-components';

export const Title = styled.h1`
    position: relative;
    display: flex;
    justify-content: center;
    color: #fff;

    &::before {
        content: '';
        border: 1px solid #fff;
        width: 7%;
        top: 110%;
        transition: 0.5s;
        position: absolute;
    }

    &:hover::before {
        width: 14%;
    }
`;

export const Showcase = styled.div`
    width: 270px;
    height: 350px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${primaryLightColor};
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: 0.3s;

    &:hover {
        box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
        transform: scale(101%, 101%);
    }

    .image {
        display: flex;
        justify-content: center;
    }

    .about {
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #fff;
    }

    .about h2 {
        font-size: 1.3em;
    }

    .about h3 {
        font-size: 1.15em;
    }
`;
