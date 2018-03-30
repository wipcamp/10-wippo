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
        data: [12, 59, 3, 5, 2, 100],
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
    registerSuccess: 0
  }
  componentDidMount = async () => {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let registerSuccess = await axios.get('/dashboard/register/success', headers)
    await this.setState({
      registerSuccess: registerSuccess.data.length
    })
  }

  percentCalculate = () => {
    
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
