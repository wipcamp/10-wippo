import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import htmlescape from 'htmlescape'

const { API_URL, URL } = process.env
const env = { API_URL, URL }


export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const { renderPage } = ctx
    const props = await Document.getInitialProps(ctx)
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags, ...props }
  }
  render () {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
          <title>Wippo | WIP Camp #10</title>
          <link href="https://fonts.googleapis.com/css?family=Kanit:400,600" rel="stylesheet" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link rel="stylesheet" href="/static/css/style.css"/>
          <link rel="stylesheet" href="/static/css/react-table.css" />
          <link rel="stylesheet" href="/static/css/sweetalert.css" />
          <script src="/static/js/fontawesome-all.min.js"></script>
          <script src="/static/js/fa-solid.js"></script>
          
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />

          <script
            dangerouslySetInnerHTML={{ __html: '__ENV__ = ' + htmlescape(env) }}
          />
        </body>
      </html>
    )
  }
}
