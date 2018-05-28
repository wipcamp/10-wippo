import React from 'react'
import Layout from '../components/layout/layout'
import Itimlobby from '../components/checkanswer/Itimlobby'

const Breadcrumb = () => (
  <ol className='breadcrumb'>
    <li className='breadcrumb-item active'>CheckAnswer</li>
  </ol>
)

export default class CheckAnswer extends React.Component {
  static async getInitialProps ({query}) {
    return { ...query }
  }

  render () {
    return (
      <Layout subheadertext={<Breadcrumb />}>
        <Itimlobby {...this.props} />
      </Layout>
    )
  }
}
