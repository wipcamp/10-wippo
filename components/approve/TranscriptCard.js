import React from 'react'
import { Line } from 'react-chartjs'
import { Card, Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import {VictoryPie, VictoryTheme} from 'victory'

const CardContainer = styled.div`
  width:100%;

  .card {
    width: 100% !important;
  }
`

const state = {
  metric: 60
}

const CardChart = styled.div`
  buttom:0;
`
const data =
  [
    {
      'key': '',
      'y': state.metric
    },
    {
      'key': '',
      'y': (100 - state.metric)
    }
  ]

const TranscriptCard = props => (
  <div>
    <CardContainer>
      <Card>
        <Card.Content>
          <Card.Header>
              Line Matthew
            <Divider />
          </Card.Header>
          <CardChart>
              <VictoryPie
                padAngle={0}
                // used to hide labels
                labelComponent={<span />}
                innerRadius={70}
                width={200} height={200}
                colorScale={[
                  '#19B3A6',
                  '#EEEEEE'
                ]}
                data={data} />
          </CardChart>
        </Card.Content>
      </Card>
    </CardContainer>
  </div>
)

export default TranscriptCard
