import React from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'
import moment from 'moment'

import getCookie from '../util/cookie'
import api from '../util/axios'
import env from '../util/env'

import Modal from '../layout/modal'
import injectGlobal from '../layout/injectGlobal'
import { MinHeight } from '../layout/layout'

const Background = styled(MinHeight)`
  font-family: 'Prompt';
  background: url('/static/img/bg.png');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  h4 {
    color: #fff;
    margin: 0;
    font-size: 4em;
  }
  .text-danger {
    font-size: 2.5em;
  }
  .card-body {
    h1 {
      color: #000;
    }
  }
  form {
    min-width: 100%;
  }
`

const CheckinInput = styled.input`
  font-size: 2em;
`

const Card = styled.div`
  margin: 0 auto;
  padding: 1em;
  min-height: 45vh;
  margin-top: 3em;
  img {
    max-width: 230px;
  }
  .row {
    min-height: 45vh;
  }
  .col-1 {
    background-color: #002d40;
  }
  h2, h5 {
    margin: 0;
  }
  h2 {
    font-size: 2.6em;
  }
`

const CardNameWarpper = styled.div`
  position: relative;
  height: 100%;

`
const CardHero = styled.h1`
  position: absolute;
  width: 45vh;
  transform: rotate(-90deg);
  top: 0;
  left: 1.5em;
  bottom: 0;
  color: #fff !important;

  @media only screen and (min-width: 1440px) {
    left: 1.6em;
  }
  @media only screen and (min-width: 1600px) {
    left: 1.8em;
  }
  @media only screen and (min-width: 1680px) {
    left: .5em;
  }
`
const CardId = styled.h1`
  position: absolute;
  font-size: 3em;
  right: 2px;
  top: -15px;

  .describe-text {
    font-size: 18px
  }
`
const CardFirstname = styled.div`
  margin: 0;
  font-size: 2.7em;
  font-weight: bold;
  line-height: 1.2;
`
const SmallTextWarpper = styled.div`
  width: ${props => props.w}%;
  margin-right: 2.4em;
`

const CardSmallText = ({header, data, width = 10}) => (
  <SmallTextWarpper w={width}>
    <h5>{header}</h5>
    <h2>{data}</h2>
  </SmallTextWarpper>
)

class Main extends React.Component {
  state={
    show: false,
    comfirm: false,
    personId: '',
    message: null,
    error: null,
    camper: null
  }

  handleFields = (field, value) => {
    if (field === 'personId' && !(/\d/.test(value))) {
      return
    }
    if (field === 'personId' && value.length > 13) {
      value = value.substring(0, 13)
    }
    this.setState({
      [field]: value
    })
    if (field === 'personId' && value.length === 13) {
      this.getCamperByPersonId(value)
    }
  }

  updateCheckin = async (e) => {
    e && e.preventDefault()
    this.handleFields('confirm', false)
    const { camper } = this.state
    const { token } = await getCookie({ req: false })
    if (camper && camper.user_id) {
      const { data: { data } } = await api.put(`/campers/${camper.user_id}/checkin`,
        {
          checkedAt: moment().format()
        }
        , {
          Authorization: `Bearer ${token}`
        }).catch(error => {
        if (error.includes('401')) {
          window.location.replace('/')
        }
      })
      if (data) {
        console.log('success')
        this.setState({
          show: true,
          message: 'เช็คอินสำเร็จ !'
        })
      } else {
        console.log('failed')
        this.setState({
          show: true,
          message: 'เช็คอินไม่สำเร็จ.'
        })
      }
    } else {
      this.setState({
        show: true,
        message: 'เช็คอินไม่สำเร็จ.'
      })
    }

    setTimeout(() => {
      this.setState({
        show: false,
        personId: '',
        camper: null
      })
    }, 1300)
  }

  getCamperByPersonId = async (personId) => {
    const { token } = await getCookie({ req: false })
    const resultCheckIn = await api.get(`/campers/${personId}/person`, {
      Authorization: `Bearer ${token}`
    }).catch(error => {
      if (error.includes('401')) {
        window.location.replace('/')
      }
      if (error.includes('404') || error.includes('500')) {
        this.setState({
          error: 'ไม่พบข้อมูล.'
        })
        setTimeout(() => {
          this.setState({
            error: null
          })
        }, 2000)
      }
    })
    if (resultCheckIn.data && resultCheckIn.data.data) {
      const [ camper ] = resultCheckIn.data.data
      if (camper) {
        this.setState({ camper, error: null })
      } else {
        this.setState({ camper: null, error: 'ไม่พบข้อมูล หรือ อาจจะเช็คอินไปแล้ว' })
      }
    } else {
      this.setState({ camper: null, error: 'ไม่พบข้อมูล หรือ อาจจะเช็คอินไปแล้ว' })
    }
  }

  async componentWillMount () {
    injectGlobal
  }

  async componentDidMount () {
    if (process.browser) {
      console.log(env.SOCKET_URL)
      const socket = io.connect(env.SOCKET_URL)
      socket.on(`personIdClient`, (personId) => {
        this.setState({ personId })
        this.getCamperByPersonId(personId)
      })
    }
  }

  render () {
    const { camper, error, personId, show, message, confirm } = this.state
    return (
      <Background className='container-fluid d-flex flex-column justify-content-center align-items-center'>
        <form onSubmit={this.updateCheckin} className='row'>
          <div className='col-12 col-lg-6 offset-lg-3'>
            <CheckinInput
              placeholder='รหัสบัตรประชาชน'
              className='form-control text-center'
              name='person'
              type='number'
              pattern='\d*'
              maxLength='13'
              id='person'
              onChange={e => this.handleFields('personId', e.target.value)}
              value={this.state.personId}
              required
            />
          </div>
          <div className='col-12 col-lg-6 offset-lg-3'>
            <button type='button' onClick={() => this.handleFields('confirm', true)} className='btn btn-lg btn-primary mt-3 col-12'>
              ยืนยัน
            </button>
          </div>
          <div className='col-12 col-lg-8 offset-lg-2'>
            <div className='text-center my-3'>
              <Card className={`card animated ${!(camper || error) ? 'd-flex align-items-center justify-content-center slideInUp' : 'flipInY'}`}>
                {
                  !camper && !error &&
                    <div className='card-body'>
                      <h4 className='mt-4 mb-5 text-danger animated infinite pulse'>"กรุณาเตรียมบัตรประชาชน"</h4>
                      <img src='/static/img/card.png' />
                    </div>
                }
                { (
                  camper && <div className='card-body text-center'>
                    <div className='row'>
                      <div className='col-1 rounded'>
                        <CardNameWarpper>
                          <CardHero>
                            WIP Camp #10 Itim Card
                          </CardHero>
                        </CardNameWarpper>
                      </div>
                      <div className='col-11 text-left'>
                        <CardId><span className='describe-text'>WIP-ID #</span>{ camper.user_id }</CardId>
                        <h5>ชื่อและนามสกุล</h5>
                        <CardFirstname>
                          { camper.first_name } { camper.last_name } <br />
                        </CardFirstname>
                        <h5>first name & last name</h5>
                        <CardFirstname>
                          { camper.first_name_en } { camper.last_name_en }
                        </CardFirstname>
                        <hr />
                        <div className='d-flex flex-row'>
                          <CardSmallText header={`ชื่อเล่น`} data={camper.nickname} />
                          <CardSmallText header={`เพศ`} data={camper.profile_gender.display_name} />
                          <CardSmallText header={`ศาสนา`} data={camper.profile_religion.display_name} />
                          <CardSmallText width={25} header={`วันเกิด`} data={camper.birth_at} />
                        </div>
                        <hr />
                        <div className='d-flex flex-flow'>
                          <CardSmallText width={60} header={`โรงเรียน`} data={camper.profile_registrant.edu_name} />
                          <CardSmallText width={30} header={`สายการเรียน`} data={camper.profile_registrant.edu_major} />
                        </div>
                        <hr />
                        <div className='d-flex flex-row'>
                          <CardSmallText width={25} header={`กรุ๊บเลือด`} data={camper.blood_group} />
                          <CardSmallText width={25} header={`อาหารที่แพ้`} data={camper.congenital_diseases} />
                          <CardSmallText width={25} header={`กรุ๊บเลือด`} data={camper.congenital_drugs} />
                        </div>
                        <div className='d-flex flex-flow'>
                          <CardSmallText width={35} header={`เบอร์โทรฯ ส่วนตัว`} data={camper.profile_registrant.telno_personal} />
                          <CardSmallText width={35} header={`เบอร์โทรฯ ผู้ปกครอง`} data={camper.profile_registrant.telno_parent} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) ||
                    (
                      error && <div className='card-body d-flex justify-content-center align-items-center'>
                        <h1>{ error }</h1>
                      </div>
                    )
                }
              </Card>
            </div>
          </div>
        </form>

        <Modal show={confirm}>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='card'>
                  <div className='card-body text-center'>
                    <h1>ยืนยันการเช็คอิน</h1>
                    <div className='mt-3 row d-flex justify-content-center align-items-center'>
                      <button className='btn btn-lg btn-danger col-5 mx-3' onClick={() => this.handleFields('confirm', false)} >
                        ยกเลิก
                      </button>
                      <button className='btn btn-lg btn-success col-5 mx-3' onClick={this.updateCheckin}>
                        ยืนยัน
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal show={show} message={message} />
      </Background>
    )
  }
}
export default Main
