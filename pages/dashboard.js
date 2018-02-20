import React from 'react'
import Layout from '../components/layout/layout'
import { Grid } from 'semantic-ui-react'
import Portlet from '../components/util/portlet'
import axios from '../components/util/axios'
import getCookie from '../components/util/cookie'
import Moment from 'moment'

const differ = (start, end) => {
  const date = new Date()
  return Moment(end).diff(date, 'days')
}
class Index extends React.Component {
  state = {
    page: '',
    registerAmount: '',
    campData: [],
    registerSuccess: 0
  }
  componentDidMount = async () => {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let data = await axios.get('/dashboard', headers)
    let registerSuccess = await axios.get('/dashboard/register/success', headers)
    this.setState({
      registerAmount: data.data.data.registerTodayAmount,
      campData: data.data.data.campDetail,
      registerSuccess: registerSuccess.data.length
    })
  }
  render () {
    return (
      <Layout subheadertext='Dashboard'>
        <div className='row'>
          <div className='col-12 col-md-4'>
            <Portlet title='น้องใหม่ประจำวัน' herotext={`${this.state.registerAmount} คน`} image='/static/img/team.svg' />
          </div>
          <div className='col-12 col-md-4'>
            <Portlet title='ปิดรับสมัครใน' herotext={`${differ(this.state.campData.opened_at, this.state.campData.closed_at)} วัน`} image='/static/img/stopwatch.svg' />
          </div>
          <div className='col-12 col-md-4'>
            <Portlet title='น้องที่สมัครเสร็จทุกขั้นตอน' herotext={`${this.state.registerSuccess} คน`} image='/static/img/team.svg' />
          </div>
        </div>
      </Layout>
    )
  }
}
export default Index
