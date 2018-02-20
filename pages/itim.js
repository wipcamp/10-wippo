import React from 'react'
import { Grid } from 'semantic-ui-react'
import Layout from '../components/layout/layout'
import DatatableCard from '../components/itim/DatatableCard'
import ItimProfile from '../components/itim/itimprofile'
class Itim extends React.Component {
  render () {
    return (
      <Layout subheadertext='Itim Management'>
        <Grid.Row>
          {
            this.props.url.query.id ? (
              <Grid.Column>
                <ItimProfile id={this.props.url.query.id} />
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
