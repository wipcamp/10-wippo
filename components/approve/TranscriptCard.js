import React from 'react'
import { Card, Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import {VictoryPie} from 'victory'
import axios from '../../utils/axios'

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

const CardChart = styled.div`
padding-left:4em;
 width:45%;
`

class TranscriptCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      transcript: 0
    }
  }

  async componentWillMount () {
    let {data: { data }} = await axios.get('/approve/Transcript')
    console.log(data)
  }

  render () {
    const data =
  [
    {
      'key': '',
      'y': this.state.transcript
    },
    {
      'key': '',
      'y': (100 - this.state.transcript)
    }
  ]
    return (
      <div>
        <CardContainer>
          <Card>
            <Card.Content>
              <Card.Header>
              จำนวนผู้ส่งใบ ปพ.1
                <Divider />
              </Card.Header>
              <Percentage>
                <text>{this.state.transcript} %</text>
              </Percentage>
              <CardChart >
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
  }
}

export default TranscriptCard
