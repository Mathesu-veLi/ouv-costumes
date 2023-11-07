import styled from 'styled-components';

export const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 600px;
`;

export const About = styled.div`
    margin: 50px;
    display: flex;
    justify-content: space-around;

    width: 100%;

    div {
        width: 40%;
    }

    h1,
    p {
        font-family: 'Anton', sans-serif;
        font-weight: bold;
    }

    p {
        font-size: 1.5em;
        line-height: 1.25em;
    }
`;

export const Title = styled.h1`
    font-style: italic;
    color: #0353ff;
    font-size: 3.3em;
    text-transform: uppercase;
    font-weight: bold;
    font-family: 'Anton', sans-serif;
`;
