import {injectGlobal} from 'styled-components'

export default injectGlobal`
  body {
    font-family: 'Kanit', sans-serif;
    font-size: 12px;
  }
  .btn-primary {
    color: #fff;
    background-color: #5867dd;
    border-color: #5867dd;
  }
  .btn-primary:hover {
    color: #fff;
    background-color: #384ad7;
    border-color: #2e40d4;
  }
  a.item {
    min-width: 85px;
    padding: 1em;
    justify-content: center;
  }
`
