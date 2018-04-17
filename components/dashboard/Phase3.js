import React from 'react'
import Portlet from '../../components/util/portlet'
import axios from '../../components/util/axios'
import getCookie from '../../components/util/cookie'
import Moment from 'moment'

const differ = (to) => {
  const now = new Date()
  const diff = Moment(to).diff(now, 'days', true)
  const diffDay = Math.floor(parseInt(Moment(to).diff(now, 'days', true)))
  if (diff < 0) {
    return 'เปิดค่าย'
  } else {
    return `${diffDay} วัน`
  }
}

class Phase3 extends React.Component {
  state = {
    openCamp: null
  }
  componentDidMount = async () => {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let data = await axios.get('/dashboard', headers)
    this.setState({
      openCamp: data.data.data.campDetail.started_at
    })
  }
  render () {
    return (
      <div className='row'>
        <div className='col-12 col-md-4 mb-4'>
          <Portlet title='เปิดค่ายในอีก' herotext={`${differ(this.state.openCamp)}`} image='/static/img/stopwatch.svg' />
        </div>
      </div>
    )
  }
}

export default Phase3
