import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
          <title>WIPPO</title>
          {this.props.styleTags}
          <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,600" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet"/>
          <link rel="stylesheet" href="/static/css/bootstrap.min.css"/>
          <link rel="stylesheet" href="/static/css/style.css"/>
          {/* <script src="/static/js/bootstrap.min.js"></script> */}
          <script src="/static/js/fontawesome-all.js"></script>
          <script src="/static/js/fa-solid.js"></script>
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
