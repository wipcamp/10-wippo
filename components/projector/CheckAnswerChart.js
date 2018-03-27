import React from 'react'
import {HorizontalBar} from 'react-chartjs-2'
import axios from '../../components/util/axios'
import getCookie from '../../components/util/cookie'

class CheckAnswerChart extends React.Component {
  state = {
    data: {
      labels: ['ข้อที่ 1', 'ข้อที่ 2', 'ข้อที่ 3', 'ข้อที่ 4', 'ข้อที่ 5', 'ข้อที่ 6'],
      datasets: [{
        label: '% of Success',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          '#45A7D0',
          '#45A7D0',
          '#45A7D0',
          '#45A7D0',
          '#45A7D0',
          '#45A7D0'
        ]
      }]
    },
    registerSuccess: 0,
    question: [0, 0, 0, 0, 0, 0],
    questionPercent: [0, 0, 0, 0, 0, 0]
  }
  componentDidMount = async () => {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let registerSuccess = await axios.get('/dashboard/register/success', headers)
    let evals = await axios.get('/evals', headers)
    let question = [0, 0, 0, 0, 0, 0]
    for (let i = 0; i < evals.data.data.length; i++) {
      question[evals.data.data[i].eval_answer.question_id - 1]++
    }
    await this.setState({
      ...this.state,
      registerSuccess: registerSuccess.data.length,
      question: question
    })
    let questionPercent = [0, 0, 0, 0, 0, 0]
    for (let i = 0; i < 6; i++) {
      questionPercent[i] = (this.state.question[i] / this.state.registerSuccess) * 100
    }
    let datasets = this.state.data.datasets
    datasets[0].data = questionPercent
    await this.setState({
      ...this.state,
      data: {
        datasets
      }
    })
  }

  render () {
    return (
      <div>
        <HorizontalBar data={this.state.data} />
      </div>
    )
  }
}

export default CheckAnswerChart
