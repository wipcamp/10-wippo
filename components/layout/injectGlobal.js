import {injectGlobal} from 'styled-components'

export default injectGlobal`
  *, body, input, h1, h2, h3, h4, h5 .btn {
    font-family: 'Prompt', sans-serif;
  }
  body, input, textarea {
    font-size: 12px;
  }
  .btn-primary {
    font-family: 'Prompt', sans-serif;
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
  div.item a {
    cursor: pointer;
  }
  ol.breadcrumb {
    padding: 0;
    background-color: #fff;
    a, li {  
      font-size: 18px;
    }
  }
`
