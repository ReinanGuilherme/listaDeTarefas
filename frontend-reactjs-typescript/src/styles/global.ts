import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`

    :root {
        --colorTextWhite: #fff;

        --colorBackground2: #212b46;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        height: 100%;
    }

    body {
        background: linear-gradient(#121212, var(--colorBackground2));
        background-repeat: no-repeat;
        color: var(--colorTextWhite);
    }

    button, input, textarea {
        
        &:focus {
            border: none;
            outline: none;
        }
    }

`