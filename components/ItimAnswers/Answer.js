import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import getCookie from '../util/cookie'
import axios from '../util/axios';

const SecHeader = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:25px;
`
const Topic = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:18px;
  margin-top: 1em;
`
const Question = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:27px;
  margin-top: 1em;
  margin-bottom: 1em;
`
const Answer = styled.div`
  font-size:16px;
  text-align:left;
  margin-top: 1em;
  margin-bottom: 1em;
`

export default class ItimAnswer extends React.Component {
  constructor () {
    super()
    this.state = {
      answer: {},
      itim: {},
      question: {data: null}
    }
  }
  async componentDidMount () {
    let {token} = await getCookie({req: false})
    await axios.get(`/answers/answer/${this.props.questionId}`, {
      Authorization: `Bearer ${token}`
    }).then(answer => this.setState({answer: answer.data[0]}))
    await axios.get(`/profiles/${this.state.answer.user_id}`, {
      Authorization: `Bearer ${token}`
    }).then(itim => this.setState({itim: itim.data}))
    await axios.get(`/questions/${this.state.answer.question_id}`, {
      Authorization: `Bearer ${token}`
    }).then(question => this.setState({question: question.data[0]}))
    console.log(this.state.itim)
  }

  render () {
    return (
      <Grid.Row>
        <div className='container'>
          <div className='row'>
            <div className='col-6 col-md-3'>
              <ItimCard
                fullName={this.state.itim.first_name + ' ' + this.state.itim.last_name}
                id={this.state.itim.user_id}
                name={this.state.itim.nickname}
              />
            </div>
            <div className='col-12 col-md-9'>
              <SecHeader className='mt-3'>
                <Icon size='big' name={'question'} />
                คำถาม
              </SecHeader>
              <div className='row card'>
                <div className='col-12 text-center'>
                  <Question>{this.state.question.data}</Question>
                </div>
              </div>
              <div style={{marginTop: '2.5em'}} className='row'>
                <SecHeader className='mt-3'>
                  <Icon size='big' name={'info'} />
                  คำตอบ
                </SecHeader>
              </div>
              <div className='row card'>
                <div className='col-12 text-center'>
                  <Answer><frame>{this.state.answer.data}</frame></Answer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid.Row>
    )
  }
}
