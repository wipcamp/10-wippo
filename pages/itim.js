import React from 'react'
import { Grid } from 'semantic-ui-react'
import Layout from '../components/layout/layout'
import DatatableCard from '../components/itim/DatatableCard'
import ItimProfile from './verify'
class Itim extends React.Component {
  render () {
    return (
      <Layout subheadertext='Itim Management'>
        <Grid.Row>
          {
            this.props.url.query.user_id ? (
              <Grid.Column>
                <ItimProfile user_id={this.props.url.query.user_id} {...this.props} />
              </Grid.Column>
            ) : (
              <Grid.Column>
                <DatatableCard {...this.props} />
              </Grid.Column>
            )
          }
        </Grid.Row>
      </Layout>
    )
  }
}

export default Itim
