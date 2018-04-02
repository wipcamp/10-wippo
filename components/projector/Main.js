import React from 'react'
import CheckAnswerChart from './CheckAnswerChart'
import styled, { injectGlobal } from 'styled-components'
import Clock from 'react-live-clock'
import Countdown from 'react-countdown-now'
import axios from '../../components/util/axios'
import getCookie from '../../components/util/cookie'

const Card = styled.div`
 box-shadow : 0px 5px 15px 3px rgba(81,77,92,0.09);
`
const NumWrapper = styled.div`
  background: #62BAE0;
  color: white;
`
const TextInNumWrapper = styled.p`
  font-size: 2em;
  padding-top:10px;
  padding-bottom:10px;
`
const Num = styled.span`
  font-size: 1.7em;
  font-weight:600;
`
const ProgressBox = styled.div`
  padding-top:10px;
  padding-bottom:10px;
`
const StyledClock = styled(Clock)`
  font-size:3em;
`
injectGlobal`
  .countdown-timer span{
    font-size:3em;
  }
`
class Main extends React.Component {
  state = {
    question: [0, 0, 0, 0, 0],
    questionPercent: [0, 0, 0, 0, 0],
    questionamount: [0, 0, 0, 0, 0],
    allPercent: 0,
    registerSuccess: 0
  }

  componentDidMount = () => {
    this.fetch()
    setInterval(() => {
      this.fetch()
    }, 10000)
  }

  fetch = async () => {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let registerSuccess = await axios.get('/dashboard/register/success', headers)
    let evals = await axios.get('/evals', headers)
    let question = [0, 0, 0, 0, 0]
    let questionPercent = [0, 0, 0, 0, 0]
    let questionamount = [0, 0, 0, 0, 0]
    let people = [3, 3, 3, 3, 3]
    let allCheckQuestion = 0
    let allQuestion = 0
    // for (let i = 0; i < evals.data.data.length; i++) {
    //   question[evals.data.data[i].eval_answer.question_id - 1]++
    // }
    // for (let i = 0; i < 5; i++) {
    //   questionPercent[i] = parseInt((question[i] / (registerSuccess.data.length * 3)) * 100)
    //   allCheckQuestion += question[i]
    // }
    for (let i = 0; i < evals.data.data.length; i++) {
      question[evals.data.data[i].eval_answer.question_id - 1]++
    }
    for (let i = 0; i < 5; i++) {
      questionamount[i] = registerSuccess.data.length * people[i]
      questionPercent[i] = parseInt((question[i] / questionamount[i]) * 100)
      allCheckQuestion += question[i]
    }
    for (let i = 0; i < 5; i++) {
      allQuestion += questionamount[i]
    }
    let allPercent = parseInt(allCheckQuestion / allQuestion) * 100
    await this.setState({
      question: question,
      registerSuccess: registerSuccess.data.length * 3,
      questionPercent: questionPercent,
      allPercent: allPercent,
      questionamount: questionamount
    })
    console.log('finish')
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='text-center my-4'>WIP Camp #10 Evaluation</h1>
          </div>
          <div className='col-8'>
            <CheckAnswerChart />
          </div>
          <div className='col-4'>
            <Card className='text-center py-3'>
              <h2>นี่คือเวลาตอนนี้</h2>
              <StyledClock format={'HH:mm:ss'} ticking timezone={'Asia/Bangkok'} />
            </Card>
            <Card className='mt-3 py-3 text-center countdown-timer'>
              <h2>คาดว่าจะเสร็จในอีก</h2>
              <Countdown date='Fri, 30 Mar 2018 22:30:00' />
            </Card>
          </div>
        </div>
        <div className='row d-flex justify-content-center my-4'>
          <Card className='col-10 py-3'>
            <div className='progress'>
              <div className='progress-bar progress-bar-striped progress-bar-animated bg-danger' role='progressbar' style={{width: `${this.state.allPercent}%`}}>{this.state.allPercent}%</div>
            </div>
          </Card>
        </div>
        <div className='row mt-3'>
          {
            this.state.question.map((q, index) =>
              <Card className='col-3 mx-5 my-4'>
                <div className='row'>
                  <NumWrapper className='col-4 my-auto'>
                    <TextInNumWrapper className='text-center'>ข้อที่<br /><Num>{index + 1}</Num></TextInNumWrapper>
                  </NumWrapper>
                  <ProgressBox className='col my-auto'>
                    <h1 className='text-center'>ตรวจแล้ว<br />{q}/{this.state.questionamount[index]}</h1>
                    <div className='progress'>
                      <div className='progress-bar progress-bar-striped progress-bar-animated bg-danger' role='progressbar' style={{width: `${this.state.questionPercent[index]}%`}}>{this.state.questionPercent[index]}%</div>
                    </div>
                  </ProgressBox>
                </div>
              </Card>
            )
          }
        </div>
      </div>
    )
  }
}

export default Main
