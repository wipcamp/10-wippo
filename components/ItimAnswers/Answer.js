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
      token: '',
      preEval: {},
      answer: {},
      query: {id: '', name: ''},
      evals: [],
      comment: '',
      question: { data: '', eval_criteria: [] },
      eval: [0, 0, 0],
      criteria: []
    }
  }
  fetchAnswer = async () => {
    let {data} = await axios
      .get(`/answers/answer/${this.state.query.answer}`, {
        Authorization: `Bearer ${this.state.token}`
      })
    await this.setState({answer: data[0]})
  }
  fetchQuestion = async () => {
    let {data} = await axios
      .get(`/questions/${this.state.query.answer.question_id}`, {
        Authorization: `Bearer ${this.state.token}`
      })
    await this.setState({ question: data[0] })
  }
  fetchEvals = async () => {
    let {data} = await axios.get(`/evals/${this.state.answer.id}`, {
      Authorization: `Bearer ${this.state.token}`
    })
    await this.setState({evals: data})
  }
  async componentWillMount () {
    this.setState({
      query: this.props
    })

    let preEval = {}
    preEval.answer_id = +this.props.answer
    preEval.checker_id = +this.props.id
    preEval.id = ''
    preEval.comment = ''
    preEval.score = 0
    preEval.criteria_id = ''
    this.setState({preEval})
  }
  async componentDidMount () {
    let { token } = await getCookie({ req: false })
    await this.setState({token})

    await this.fetchQuestion()
    await this.fetchAnswer()
    await this.fetchEvals()

    if (this.state.evals.length > 0) {
      this.handleEval(0, this.state.evals[0].score)
      if (this.state.evals[1]) {
        this.handleEval(1, this.state.evals[1].score)
      }
      if (this.state.evals[2]) {
        this.handleEval(2, this.state.evals[2].score)
      }
    }
  }

  handleChange = (field, value) => {
    this.setState({
      [field]: +value
    })
  }
  handleEval = (key, value) => {
    let newEval = this.state.eval
    newEval[key] = +value || 0
    this.setState({
      eval: newEval
    })
  }

  submitHandeler = async (e) => {
    let finalEval = {}
    finalEval[0] = {
      answer_id: this.state.query.answer,
      criteria_id: this.state.question.eval_criteria[0].id,
      checker_id: this.state.query.id,
      comment: this.state.comment,
      score: this.state.eval[0]
    }
    finalEval[1] = {
      answer_id: this.state.query.answer,
      criteria_id: this.state.question.eval_criteria[1].id,
      checker_id: this.state.query.id,
      score: this.state.eval[1]
    }
    if (this.state.question.eval_criteria[2]) {
      finalEval[2] = {
        answer_id: this.state.query.answer,
        criteria_id: this.state.question.eval_criteria[2].id,
        checker_id: this.state.query.id,
        score: this.state.eval[2]
      }
    }
    if (!this.state.evals.length > 0) {
      await axios.post('/evals/criteria', finalEval, {
        Authorization: `Bearer ${this.state.token}`
      })
    } else {
      await axios.put('/evals/criteria', finalEval, {
        Authorization: `Bearer ${this.state.token}`
      })
    }
  }

  render () {
    return (
      <Grid.Row>
        <div className='container'>
          <div className='row'>
            <div className='col-6 col-md-3 mb-3'>
              <ItimCard
                id={this.state.query.id}
                name={this.state.query.name}
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
                    <div className='row'>
                      <SecHeader className='mt-3 mb-2'>
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
                      <SecHeader className='mt-1 mb-2'>
                        <Icon size='big' name={'comment outline'} />
                        ประเมิณน้อง
                      </SecHeader>
                      <div className='card'>
                        <textarea
                          value={this.state.comment}
                          onChange={e => this.handleChange('comment', e.target.value)}
                          className='form-control'
                          placeholder={`ให้ความเห็นตรงนี้เลย!`}
                        />
                      </div>
                    </Box>
                    <div
                      className='row mt-2 mb-3'
                    >
                      {
                        this.state.question.eval_criteria.map((data, i) =>
                          <div key={i} className='col-12 col-md-4 mb-2'>
                            <span>ด้าน {data.name}</span>
                            <input
                              onChange={e => this.handleEval(i, e.target.value)}
                              value={this.state.eval[i]}
                              className='form-control'
                              type='number'
                              step='0.10'
                            />
                          </div>
                        )
                      }
                    </div>
                    <div
                      className='col-12 mt-3 d-flex justify-content-center align-items-center'
                    >
                      <div>
                        <a onClick={this.submitHandeler} className='mb-3 btn btn-warning btn-lg'>Submit!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Grid.Row>
    )
  }
}
