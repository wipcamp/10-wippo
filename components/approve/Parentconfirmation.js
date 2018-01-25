import React from 'react'
import { Card, Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import {VictoryPie} from 'victory'

const CardContainer = styled.div`
  width:100%;
  .card {
    width: 100% !important;
  }
`

const Percentage = styled.div`
  position:absolute;
  padding-top: 9%;
  padding-left:60%;
  font-size:4em;
  `

const state = {
  metric: 25
}

const CardChart = styled.div`
padding-left:4em;
 width:45%;
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

const Parentconfirmation = props => (
  <div>
    <CardContainer>
      <Card>
        <Card.Content>
          <Card.Header>
              Line Matthew
            <Divider />
          </Card.Header>
          <Percentage>
            <text>{state.metric} %</text>
          </Percentage>
          <CardChart class='text-center'>
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

export default Parentconfirmation
