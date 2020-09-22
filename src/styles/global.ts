import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: transparent;
    font: 400 16px Poppins, sans-serif;
  }

  #__next-prerender-indicator {
  display: none;
}
`
