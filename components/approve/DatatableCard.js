import React from 'react'
import { Card, Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import ApproveTable from './approveTable'

const CardContainer = styled.div`
  width:100%;

  .card {
    width: 100% !important;
  }
`

const DatatableCard = props => (
  <div>
    <CardContainer>
      <Card>
        <Card.Content>
          <Card.Header>
              Itims
            <Divider />
          </Card.Header>
          <ApproveTable />
        </Card.Content>
      </Card>
    </CardContainer>
  </div>
)

export default DatatableCard
