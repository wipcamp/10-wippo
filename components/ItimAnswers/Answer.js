import React from 'react'
import ItimCard from './itimcard'
import { Grid, Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import getCookie from '../util/cookie'
import axios from '../util/axios'

const SecHeader = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:25px;
`

const Question = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:15px;
  margin-top: 1em;
  margin-bottom: 1em;
`
const Answer = styled.div`
  font-size:20px;
  text-align:left;
  margin-top: 1em;
  margin-bottom: 1em;
`
const Box = styled.div`
  margin-top:30px;
  width:100%;
`

export default class ItimAnswer extends React.Component {
  constructor () {
    super()
    this.state = {
      preEval: [],
      answer: {},
      itim: {},
      evals: [],
      eval1: [],
      eval2: [],
      eval3: [],
      criteria: [],
      question: { data: null },
      checker: {}
    }
    this.eval1Handeler = this.eval1Handeler.bind(this)
    this.eval2Handeler = this.eval2Handeler.bind(this)
    this.eval3Handeler = this.eval3Handeler.bind(this)
    this.submitHandeler = this.submitHandeler.bind(this)
  }
  async componentDidMount () {
    let user = window.localStorage.getItem('user')
    this.setState({checker: JSON.parse(user)})
    let { token } = await getCookie({ req: false })
    await axios
      .get(`/answers/answer/${this.props.questionId}`, {
        Authorization: `Bearer ${token}`
      })
      .then(answer => this.setState({ answer: answer.data[0] }))
    await axios
      .get(`/profiles/${this.state.answer.user_id}`, {
        Authorization: `Bearer ${token}`
      })
      .then(itim => this.setState({ itim: itim.data }))
    await axios
      .get(`/questions/${this.state.answer.question_id}`, {
        Authorization: `Bearer ${token}`
      })
      .then(question => this.setState({ question: question.data[0] }))
    await axios.get(`evals/criteria/${this.state.answer.question_id}`, {
      Authorization: `Bearer ${token}`
    }).then(criteria => this.setState({criteria: criteria.data}))
    await axios.get(`/evals/${this.state.answer.id}`, {
      Authorization: `Bearer ${token}`
    }).then(e => this.setState({evals: e.data}))

    let preEval = []
    preEval['id'] = null
    preEval['answer_id'] = this.state.answer.question_id
    preEval['criteria_id'] = this.state.criteria.id
    preEval['checker_id'] = this.state.checker.id
    preEval['score'] = 0
    this.setState({preEval})

    console.log('preEval ', preEval)
    console.log('state eval ', this.state.preEval)
    console.log('realEvas',this.state.evals)
    if (this.state.evals.length > 0) {
      this.setState({eval1: this.state.evals[0]})
      this.setState({eval2: this.state.evals[1]})
      this.setState({eval3: this.state.evals[2]})
    }
  }

  eval1Handeler (e) {
    let temp = this.state.eval1
    temp['score'] = e.target.value
    this.setState({eval1: temp})
  }
  eval2Handeler (e) {
    let temp = this.state.eval2
    temp['score'] = e.target.value
    this.setState({eval2: temp})
  }
  eval3Handeler (e) {
    let temp = this.state.eval3
    temp['score'] = e.target.value
    this.setState({eval3: temp})
  }

  async submitHandeler (e) {
    let temp = await this.state.preEval
    let temp1 = await this.state.preEval
    let temp2 = await this.state.preEval
    let evals = []
    temp.score = await this.state.eval1.score
    temp1.score = await this.state.eval2.score
    temp2.score = await this.state.eval3.score
    evals[0] = await temp
    evals[1] = await temp1
    evals[2] = await temp2
    console.log(evals)
    // console.log('evals ', evals)
    // temp.score = await this.state.eval2.score
    // evals[1] = await temp
    // await evals.push(temp)
    // temp.score = await this.state.eval3.score
    // evals[2] = await temp
    // await evals.push(temp)
    // console.log('evals', evals)
    // let { token } = await getCookie({ req: false })
    // if (this.state.evals.length > 0) {
    //   await axios.post(`/evals/criteria`, {
    //     answer_id: this.state.answer.id,
    //     criteria_id: e.target.id,
    //     checker_id: this.state.checker.id,
    //     score: e.target.value
    //   }, {
    //     Authorization: `Bearer ${token}`
    //   })
    // } else {
    //   await axios.post(`/evals/`, {
    //     answer_id: this.state.answer.id,
    //     criteria_id: e.target.id,
    //     checker_id: this.state.checker.id,
    //     score: e.target.value,
    //     _method: 'put'
    //   }, {
    //     Authorization: `Bearer ${token}`
    //   })
    // }
  }

  render () {
    return (
      <Grid.Row>
        <div className='container'>
          <div className='row'>
            <div className='col-6 col-md-3'>
              <ItimCard
                fullName={
                  this.state.itim.first_name + ' ' + this.state.itim.last_name
                }
                id={this.state.itim.user_id}
                name={this.state.itim.nickname}
              />
            </div>
            <div className='col-12 col-md-9'>
              <div className='card' style={{marginBottom: '8px'}}>
                <SecHeader className='mt-3'>
                  <Icon size='big' name={'question'} />
                คำถาม
                </SecHeader>
                <div className='row'>
                  <div className='col-12 text-center'>
                    <Question>{this.state.question.data}</Question>
                  </div>
                </div>
              </div>
              <div className='card'>
                <div>
                  <div className='container'>
                    <div style={{ marginTop: '2.5em' }} className='row'>
                      <SecHeader className='mt-3'>
                        <Icon size='big' name={'info'} />
                        คำตอบ
                      </SecHeader>
                    </div>
                    <div className='card'>
                      <div className='col-12 text-center'>
                        <Answer>
                          <div
                            dangerouslySetInnerHTML={{ __html: this.state.answer.data }}
                          />
                        </Answer>
                      </div>
                    </div>
                    <Box>
                      <SecHeader className='mt-3 mb-2'>
                        <Icon size='big' name={'comment outline'} />
                          Comment
                      </SecHeader>
                      <div className='card'>
                        <textarea className='form-control' />
                      </div>
                      <div
                        className='row'
                        style={{ marginTop: '20px', marginLeft: '40px', marginBottom: '30px' }}
                      >
                        <div
                          className='col-md-2 col-12 mr-auto'
                          style={{ width: '8px' }}
                        >
                          <div className='col-md-4'>
                            <span>ด้านที่1</span>
                            <input onChange={this.eval1Handeler} value={this.state.eval1['score']} className='form-control' type='number' step='0.10' />
                          </div>
                          <div className='col-md-4'>
                            <span>ด้านที่2</span>
                            <input onChange={this.eval2Handeler} value={this.state.eval2['score']} className='form-control' type='number' step='0.10' />
                          </div>
                          <div className='col-md-4'>
                            <span>ด้านที่3</span>
                            <input onChange={this.eval3Handeler} value={this.state.eval3['score']} className='form-control' type='number' step='0.10' />
                          </div>
                          <div
                            style={{ paddingTop: '12px' }}
                            className='col-md-1 col-6 mr-auto'
                          >
                            <div>
                              <a onClick={this.submitHandeler} className='btn btn-success'>Submit!</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{/* END */}
      </Grid.Row>
    )
  }
}
