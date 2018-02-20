import React from 'react'
import Layout from '../components/layout/layout'
import TranscriptCard from '../components/approve/TranscriptCard'
import Parentconfirmation from '../components/approve/Parentconfirmation'
import DatatableCard from '../components/approve/DatatableCard'
import {Grid} from 'semantic-ui-react'

const Approve = () =>
  (
    <div>
      <Layout subheadertext={'Approve System'}>
        <Grid >
          <Grid.Row>
            <Grid.Column width={8}>
              <TranscriptCard />
            </Grid.Column>
            <Grid.Column width={8}>
              <Parentconfirmation />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <DatatableCard />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    </div>
  )
export default Approve
