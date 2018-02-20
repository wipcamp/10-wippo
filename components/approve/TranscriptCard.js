import React from 'react'
import styled from 'styled-components'
import axios from '../util/axios'
import getCookie from '../util/cookie'

const CardContainer = styled.div`
  width:100%;
  .card {
    width: 100% !important;
  }
`

const Text = styled.div`
  font-size:4em;
  padding: .5em 1em;
`

class TranscriptCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: 0,
      doc: 0
    }
  }

  async componentWillMount () {
    let {token} = await getCookie({req: false})
    let user = await axios.get('/dashboard/register/all', {
      Authorization: `Bearer ${token}`
    })
    let {data} = await axios.get('/approve/count/transcript', {
      Authorization: `Bearer ${token}`
    })
    this.setState({doc: data[0].sum, user: user.data[0].sum})
  }

  render () {
    return (
      <div>
        <CardContainer>
          <Card>
            <Card.Content>
              <Card.Header>
                <h1>จำนวนน้องที่ยังไม่ส่งใบ ปพ.1</h1>
                <Text className='text-center'>
                  {this.state.user - this.state.doc} คน
                </Text>
              </Card.Header>
            </Card.Content>
          </Card>
        </CardContainer>
      </div>
    )
  }
}

export default TranscriptCard
