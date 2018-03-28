import React from 'react'
import Layout from '../components/layout/layout'
import DatatableCard from '../components/itim/DatatableCard'
import ItimProfile from '../components/itim/itimprofile'
class Itim extends React.Component {
  render () {
    const answer = this.props.url.query.answer_id
    return (
      <Layout subheadertext='Itim Management'>
        <div className='row'>
          {
            this.props.url.query.user_id ? (
              <div className='col'>
                <ItimProfile user_id={this.props.url.query.user_id} {...this.props} />
              </div>
            ) : (
              <div className='col'>
                <DatatableCard {...this.props} />
              </div>
            )
          }
        </div>
      </Layout>
    )
  }
}

export default Itim
