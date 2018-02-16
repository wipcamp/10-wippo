import React from 'react'
import Layout from '../components/layout/layout'
import { Grid } from 'semantic-ui-react'
import WipperMain from '../components/wipper/Main'
class Wipper extends React.Component {
  state = {

  }
  render () {
    return (
      <Layout subheadertext='WIPPER Management'>
        <Grid.Row>
          <Grid.Column>
            <WipperMain></WipperMain>
          </Grid.Column>
        </Grid.Row>
      </Layout>
    )
  }
}

export default Wipper
