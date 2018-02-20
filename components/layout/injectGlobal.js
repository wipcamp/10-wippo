import {injectGlobal} from 'styled-components'

export default injectGlobal`
  body, input, textarea {
    font-family: 'Kanit', sans-serif;
    font-size: 12px;
  }
  .btn-primary {
    font-family: 'Kanit', sans-serif;
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
