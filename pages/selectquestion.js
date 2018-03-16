import React from 'react'
import Layout from '../components/layout/layout'

export default class Selectquestion extends React.Component {
  render () {
    const Breadcrumb = () => <ol className='breadcrumb'>
      <li className='breadcrumb-item active' aria-current='page'>Select Question</li>
    </ol>

    return (
      <Layout subheadertext={<Breadcrumb />}>
        Hi
      </Layout>
    )
  }
}
