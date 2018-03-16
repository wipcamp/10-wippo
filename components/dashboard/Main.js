import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/layout/layout'
import Portlet from '../../components/util/portlet'
import axios from '../../components/util/axios'
import getCookie from '../../components/util/cookie'
import Moment from 'moment'
import {Doughnut ,Line} from 'react-chartjs-2'

const Header = styled.h3`
  font-weight: 500;
  font-size: 1.6em;
  color: #3f4047;
`

const differ = (start, end) => {
  const date = new Date()
  return Moment(end).diff(date, 'days')
}

class Main extends React.Component {
  state = {
    page: '',
    registerAmount: '',
    campData: [],
    registerSuccess: 0,
    userInSystem: 0,
    userDocSuccess: 0,
    userProfileSuccess: 0,
    userUploadTranscript: 0,
    userUploadParentAllow: 0
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
    let userUploadTranscript = await axios.get('/approve/count/transcript', headers)
    let userUploadParentAllow = await axios.get('/approve/count/parentpermission', headers)
    await this.setState({
      registerAmount: data.data.data.registerTodayAmount,
      campData: data.data.data.campDetail,
      registerSuccess: registerSuccess.data.length,
      userInSystem: userInSystem.data[0].sum,
      userDocSuccess: userDocSuccess.data[0].sum,
      userProfileSuccess: userProfileSuccess.data[0].sum,
      userUploadTranscript: userUploadTranscript.data[0].sum,
      userUploadParentAllow: userUploadParentAllow.data[0].sum
    })
  }
  render () {
    const data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
    return (
      <Layout subheadertext='Dashboard'>
        <div className='row'>
          <div className='col'>
            <Doughnut ref='chart' data={data} />
          </div>
          <div className='col'>
            <Line data={data} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-4 mb-4'>
            <Portlet title='น้องใหม่ประจำวัน' herotext={`${this.state.registerAmount} คน`} image='/static/img/team.svg' />
          </div>
          <div className='col-12 col-md-4 mb-4'>
            <Portlet title='ปิดรับสมัครใน' herotext={`${differ(this.state.campData.opened_at, this.state.campData.closed_at)} วัน`} image='/static/img/stopwatch.svg' />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Header className='my-2'>Itim Overview</Header>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-4 mb-4'>
            <Portlet title='จำนวนน้องในระบบ' herotext={`${this.state.userInSystem} คน`} image='/static/img/team.svg' />
          </div>
          <div className='col-12 col-md-4 mb-4'>
            <Portlet title='น้องที่สมัครเสร็จทุกขั้นตอน' herotext={`${this.state.registerSuccess} คน`} image='/static/img/team.svg' />
          </div>
          <div className='col-12 col-md-4 mb-4'>
            <Portlet title='จำนวนน้องที่อัพเอกสารไม่เสร็จ' herotext={`${this.state.userInSystem - this.state.userDocSuccess} คน`} image='/static/img/team.svg' />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-4 mb-4'>
            <Portlet title='จำนวนน้องที่กรอกข้อมูลครบ' herotext={`${this.state.userProfileSuccess} คน`} image='/static/img/team.svg' />
          </div>
          <div className='col-12 col-md-4 mb-4'>
            <Portlet title='จำนวนน้องที่ยังไม่อัพ ปพ.1' herotext={`${this.state.userInSystem - this.state.userUploadTranscript} คน`} image='/static/img/team.svg' />
          </div>
          <div className='col-12 col-md-4 mb-4'>
            <Portlet title='จำนวนน้องที่ยังไม่อัพ ใบอนุญาติผู้ปกครอง' herotext={`${this.state.userInSystem - this.state.userUploadParentAllow} คน`} image='/static/img/team.svg' />
          </div>
        </div>
      </Layout>
    )
  }
}
export default Main
