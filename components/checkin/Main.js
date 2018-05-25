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
  h1 {
    color: #fff;
    margin: 0;
    font-size: 4em;
  }
  .text-danger {
    font-size: 5.5em;
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
  font-size: 4em;
`

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
          <div className='col-12'>
            <div className='text-center my-3'>
              <div className='card'>
                <div className='card-body'>
                  <h1>Check-In System WIP Camp #10</h1>
                  <h1 className='text-danger animated infinite pulse'>"กรุณาเตรียมบัตรประชาชน"</h1>
                </div>
              </div>
            </div>
            <CheckinInput
              placeholder='ตัวอย่าง 1100888555999'
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

          <div className='col-12 col-md-6'>
            <button type='button' onClick={() => this.getCamperByPersonId(personId)} className='btn btn-lg btn-info mt-3 col-12'>
              ดึงข้อมูล
            </button>
          </div>
          <div className='col-12 col-md-6'>
            <button type='button' onClick={() => this.handleFields('confirm', true)} className='btn btn-lg btn-primary mt-3 col-12'>
              ยืนยัน
            </button>
          </div>
          <div className='col-12'>
            { (camper || error) && <div className='mt-3 card'>
              {
                camper &&
                <div className='card-body text-center'>
                  <h1>WIP ID : { camper.user_id }</h1>
                  <h2>ชื่อจริง - นามสกุล : { camper.first_name } { camper.last_name }</h2>
                  <h2>
                    กรุ๊บเลือด : { camper.blood_group } |
                    อาหารที่แพ้ : { camper.congenital_diseases } |
                    ยาประจำตัว : { camper.congenital_drugs }
                  </h2>
                  <h2>
                    โรงเรียน : { camper.profile_registrant.edu_name }
                  </h2>
                </div>
              }
              {
                error &&
                <div className='card-body text-center'>
                  <h1>{ error }</h1>
                </div>
              }
            </div>
            }
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
