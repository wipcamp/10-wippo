import React from 'react'
import styled from 'styled-components'
import axios from '../util/axios'
import cookie from '../util/cookie'

export class Questions extends React.Component {
  constructor (props) {
    super()
  }

  render () {
    const Input = styled.select`
    font-style: italic;
    `
    return (
      <Input className='form-control form-control-lg'>
        <option>กรุณาเลือกคำถามที่ต้องการจะตรวจ</option>
        {this.props.data.map(question => <option>{question}</option>)}
      </Input>
    )
  }
}

export default class SelectQuestion extends React.Component {
  constructor () {
    super()
    this.state = {
      questions: [],
      select: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  async componentDidMount () {
    this.setState({ loading: true })
    let teams = await JSON.parse(window.localStorage.getItem('team'))
    let { token } = await cookie({ req: false })
    let questions = await teams.map(async team => {
      const { data } = await axios.get(`/questions/role/${team.role}`, {
        Authorization: `Bearer ${token}`
      })
      return data
    })
    Promise.all(questions).then(vals => {
      vals.map(val =>
        this.setState({ questions: [...this.state.questions, ...val], loading: false })
      )
    })
  }

  handleSelect (e) {
  }

  render () {
    const Input = styled.select`
    font-style: italic;
    `
    const Submitbutton = styled.button`
      margin-top:40px;
    `
    return (
      <div>
        <div className='container'>
          <div className='jumbotron'>
            <h1>เลือกคำถามที่พี่ wipper ต้องการตรวจเลย!</h1>
            <p className='lead'>
              {this.state.select || `(คำบรรยายในการตรวจคำถาม) Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Fusce quis lacus aliquet, bibendum turpis sed, congue lacus.
              Praesent vitae condimentum sem, quis facilisis enim. Maecenas in volutpat sapien.
              Praesent malesuada sapien vel est dapibus finibus.`}
            </p>
            <hr className='my-4' />
            {/* <Questions data={this.state.questions} /> */}
            <Input className='form-control form-control-lg' onChange={this.handleSelect}>
              <option>กรุณาเลือกคำถามที่ต้องการจะตรวจ</option>
              {this.state.questions.map((question, index) => (
                <option
                  key={question.id}
                >{`${index + 1}.${question.data}`}</option>
              ))}
            </Input>
            <div className='col-12 text-right'>
              <Submitbutton className='btn btn-primary btn-lg'>
                Rock n Roll
              </Submitbutton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
