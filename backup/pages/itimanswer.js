import React from 'react'
import Layout from '../components/layout/layout'
import Answer from '../components/ItimAnswers/Answer'

const Breadcrumb = () => <ol className='breadcrumb'>
  <li className='breadcrumb-item'><a href='/checkanswer'>CheckAnswer</a></li>
  <li className='breadcrumb-item active' aria-current='page'>ItimAnswer</li>
</ol>

export default class ItimAnswer extends React.Component {
  static async getInitialProps ({query}) {
    return { ...query }
  }

  render () {
    return (
      <Layout subheadertext={<Breadcrumb />}>
        <Answer {...this.props} />
      </Layout>
    )
  }
}
