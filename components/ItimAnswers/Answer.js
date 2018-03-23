import React from 'react'
import ItimCard from '../general/itimcard'
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
      answer: {},
      itim: {},
      question: { data: null }
    }
  }
  async componentDidMount () {
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
    console.log(this.state.itim)
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
                <div calssName='row'>
                  <div className='container'>

                    <div style={{ marginTop: '2.5em' }} className='row'>
                      <SecHeader className='mt-3'>
                        <Icon size='big' name={'info'} />
                        คำตอบ
                      </SecHeader>
                    </div>
                    <div className='card'>
                      <div className='col-12 text-center'>
                        {console.log(this.state.answer)}
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
                        style={{ marginTop: '20px', marginLeft: '40px' ,marginBottom: '30px' }}
                      >
                        <div
                          className='col-md-2 col-12 mr-auto'
                          style={{ width: '8px' }}
                        >
                          <span>ด้านที่ 1 </span>
                          <span>
                            <input className='form-control' type='number' step='0.10' />
                          </span>
                        </div>
                        <div className='col-md-2 mr-auto'>
                          <span>ด้านที่ 2 </span>
                          <span>
                            <input className='form-control' type='number' step='0.10' />
                          </span>
                        </div>
                        <div className='col-md-2 mr-auto'>
                          <span>ด้านที่ 3 </span>
                          <span>
                            <input className='form-control' type='number' step='0.10' />
                          </span>
                        </div>
                        <div
                          style={{ paddingTop: '12px' }}
                          className='col-md-1 col-6 mr-auto'
                        >
                          <div>
                            <a href='/checkanswer' className='btn btn-success'>Submit!</a>
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
