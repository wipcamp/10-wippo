import React from 'react'
import Layout from '../components/layout/layout'
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
    registerSuccess: 0,
    userInSystem: 0,
    userDocSuccess: 0,
    userProfileSuccess: 0
  }
  componentDidMount = async () => {
    let {token} = await getCookie({req: false})
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let data = await axios.get('/dashboard', headers)
    let userProfileSuccess = await axios.get('/dashboard/profile/success', headers)
    let userInSystem = await axios.get('/dashboard/register/all', headers)
    let registerSuccess = await axios.get('/dashboard/register/success', headers)
    let userDocSuccess = await axios.get('/dashboard/document/success', headers)
    this.setState({
      registerAmount: data.data.data.registerTodayAmount,
      campData: data.data.data.campDetail,
      registerSuccess: registerSuccess.data.length,
      userInSystem: userInSystem.data[0].sum,
      userDocUnSuccess: userDocSuccess.data,
      userProfileSuccess: userProfileSuccess.data[0].sum
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
        </div>
        <div className='row'>
          <div className='col-12 col-md-4'>
            <Portlet title='จำนวนน้องในระบบ' herotext={`${this.state.userInSystem} คน`} image='/static/img/team.svg' />
          </div>
          <div className='col-12 col-md-4'>
            <Portlet title='น้องที่สมัครเสร็จทุกขั้นตอน' herotext={`${this.state.registerSuccess} คน`} image='/static/img/team.svg' />
          </div>
          <div className='col-12 col-md-4'>
            <Portlet title='จำนวนน้องที่อัพเอกสารไม่เสร็จ' herotext={`${this.state.userInSystem - this.state.userDocSuccess} คน`} image='/static/img/team.svg' />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-4'>
            <Portlet title='จำนวนน้องที่กรอกข้อมูลครบ' herotext={`${this.state.userProfileSuccess} คน`} image='/static/img/team.svg' />
          </div>
        </div>
      </Layout>
    )
  }
}
export default Index
