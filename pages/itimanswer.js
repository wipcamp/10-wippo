import React from 'react'
import Layout from '../components/layout/layout'
import ItimAnswer from '../components/ItimAnswers/Answer'

const Breadcrumb = () => <ol className='breadcrumb'>
  <li className='breadcrumb-item'><a href='/checkanswer'>CheckAnswer</a></li>
  <li className='breadcrumb-item active' aria-current='page'>ItimAnswer</li>
</ol>

export default (props) => (
  <Layout subheadertext={<Breadcrumb />}>
    <ItimAnswer questionId={props.url.query.answer_id} />
  </Layout>
)
