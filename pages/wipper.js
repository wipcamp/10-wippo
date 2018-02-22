import React from 'react'
import Layout from '../components/layout/layout'
import { Grid } from 'semantic-ui-react'
import WipperMain from '../components/wipper/Main'
class Wipper extends React.Component {

  render () {
    return (
      <Layout subheadertext=''>
        <Grid.Row>
          <Grid.Column>
            <WipperMain {...this.props} />
          </Grid.Column>
        </Grid.Row>
      </Layout>
    )
  }
}

export default Wipper
