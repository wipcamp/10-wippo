import React from 'react'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from '../util/axios'
import getCookie from '../util/cookie'

export const CardContainer = styled.div`
  font-family: 'Prompt', sans-serif;
  width:100%;
  .card {
    width: 100% !important;
  }
  h1 {
    margin: 0 auto;
    font-family: 'Prompt', sans-serif;
  }
`
export const Text = styled.div`
  font-family: 'Prompt', sans-serif;
  font-size:4em;
  padding: .5em 1em;
`

class Parentconfirmation extends React.Component {
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
    let {data} = await axios.get('/approve/count/parentpermission', {
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
              <Card.Header className='text-center'>
                <h1>จำนวนน้องที่ยังไม่ส่งใบ ยืนยันผู้ปกครอง</h1>
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

export default Parentconfirmation
