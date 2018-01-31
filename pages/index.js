import React from 'react'
import Layout from '../components/layout/layout'
import { Button, Grid } from 'semantic-ui-react'

export default props => (
  <Layout subheadertext='Dashboard'>
    <Grid.Row>
      <Grid.Column>
        <Button>Click Here</Button>
      </Grid.Column>
    </Grid.Row>
  </Layout>
)
