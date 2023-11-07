import { createGlobalStyle } from 'styled-components';

export const primaryColor = '#21333f';
export const primaryDarkColor = '#091215';
export const primaryLightColor = '#91a3af';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html,
    body {
        max-width: 100vw;
        overflow-x: hidden;
    }

    body {
        color: #fff;
        background: ${primaryDarkColor};
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;
