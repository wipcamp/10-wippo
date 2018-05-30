/* global FormData */
import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Icon } from 'semantic-ui-react'
import styled, { keyframes } from 'styled-components'
import Dropzone from 'react-dropzone'
import { compose, withState, lifecycle, withStateHandlers, withHandlers } from 'recompose'

import getCookie from '../util/cookie'
import api from '../util/axios'

const SecHeader = styled.div`
  font-family: 'Prompt', sans-serif !important;
  font-size:25px;
`
const Topic = styled.div`
  font-family: 'Prompt', sans-serif !important;
  font-size:18px;
  margin-top: 1em;
`

const filetype = {
  PARENTAL_AUTHORIZATION: 2,
  TRANSCRIPTION_RECORD: 3
}

const documentStatus = {
  NOT_FOUND: -1,
  APPROVE: 1,
  REJECTED: 0,
  PENDING: null
}

const StyledDropzone = styled.div`
  font-family: 'Prompt', sans-serif !important;
  font-size:18px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  cursor: pointer;
  border-radius: 4px;
  ${props => props.status === documentStatus.APPROVE && `
    background: #78E6D0;
    color: gray;
    cursor: no-drop;
  `}

  ${props => props.status === documentStatus.REJECTED && `
    background: #DF6760;
    color: #fff;
  `}

  ${props => props.status === documentStatus.PENDING && `
    background: #FFE52B;
  `}

  ${props => props.status === documentStatus.NOT_FOUND && `
    background: lightgray;
  `}
`

const GuideText = styled.p`
  color: ${props => props.color === 0 && '#fff'};
`

const getDocumentStatus = (typeId, userInfo) => {
  let { documents } = userInfo
  if (documents !== undefined) {
    documents = documents.filter(data => data.type_id === typeId)

    if (documents.length === 0) {
      return documentStatus.NOT_FOUND
    } else if (documents.findIndex(data => data.is_approve === documentStatus.APPROVE) > -1) {
      return documentStatus.APPROVE
    } else {
      return documents[documents.length - 1].is_approve
    }
  }
}

const bounce = keyframes`
  from {
    top: 50%
  }
  to {
    top: 45%;
  }
`

const AnimateUpload = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  i {
    color: white;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${bounce} 1s ease infinite;
  }
`

const Circle = styled.div`
  /* width: 40px; */
  height: 40px;
  background: ${props => props.color};
  /* border-radius: 50%; */
  padding: 0 10px;
  color: ${props => props.color === '#DF6760' && '#fff'};
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
`

const FlexContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.3);
  color: white;
`

const Tab1 = (props) => {
  const { question, fullName, info, image, path, facebook, transcript, parentalAuth, activeDrag } = props
  return (
    <Grid.Row>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-3'>
            <ItimCard
              question={question}
              fullName={fullName}
              id={info.user_id}
              src={image}
              name={`น้อง ${info.nickname}`}
              facebook={facebook}
            />
          </div>
          <div className='col-12 col-md-9'>
            <SecHeader className='mt-3'>
              <Icon size='big' name={'user'} />
              ข้อมูลส่วนตัว
            </SecHeader>
            <div className='row'>
              <Topic className='col'>WIP ID :<input readOnly className='form-control bg-danger text-white' type='text' value={info.user_id || ''} /></Topic>
              <Topic className='col'>เบอร์โทร :<input readOnly className='form-control bg-danger text-white' type='text' value={info.profile_registrant.telno_personal || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>เลขประจำตัวประชาชน : <input readOnly className='form-control' type='text' value={info.citizen_id || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>ชื่อ : <input readOnly className='form-control' type='text' value={info.first_name || ''} /></Topic>
              <Topic className='col'>นามสกุล :<input readOnly className='form-control' type='text' value={info.last_name || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>โรค :<input readOnly className='form-control' type='text' value={info.congenital_diseases || ''} /></Topic>
              <Topic className='col'>ยาประจำตัว :<input readOnly className='form-control' type='text' value={info.congenital_drugs || ''} /></Topic>
              <Topic className='col'>อาหารที่แพ้ :<input readOnly className='form-control' type='text' value={info.allergic_foods || ''} /></Topic>
              <Topic className='col'>กรุ๊บเลือด :<input readOnly className='form-control' type='text' value={info.blood_group || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>เบอร์โทรผู้ปกครอง : <input readOnly className='form-control' type='text' value={info.profile_registrant.telno_parent || ''} /></Topic>
              <Topic className='col'>ความสัมพันธ์ :<input readOnly className='form-control' type='text' value={info.profile_registrant.parent_relation || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>จังหวัด :<input readOnly className='form-control' type='text' value={info.profile_registrant.addr_prov || ''} /></Topic>
              <Topic className='col'>เขต : <input readOnly className='form-control' type='text' value={info.profile_registrant.addr_dist || ''} /></Topic>
            </div>
            <div className='row'>
              <div className='col-12'>
                <SecHeader className='mt-3'>
                  <Icon size='big' name={'pencil'} />
                ข้อมูลการศึกษา
                </SecHeader>
                <div className='row'>
                  <Topic className='col'>โรงเรียน :<input readOnly className='form-control' type='text' value={info.profile_registrant.edu_name || ''} /></Topic>
                  <Topic className='col'>ลำดับชั้น :<input readOnly className='form-control' type='text' value={info.profile_registrant.edu_lv || ''} /></Topic>
                  <Topic className='col'>สายการเรียน :<input readOnly className='form-control' type='text' value={info.profile_registrant.edu_major || ''} /></Topic>
                  <Topic className='col'>เกรด :<input readOnly className='form-control' type='text' value={info.profile_registrant.edu_gpax || ''} /></Topic>
                </div>
              </div>
            </div>
            <div className='row mb-5'>
              <div className='col-12'>
                <SecHeader className='mt-3'>
                  <Icon className='mr-3' size='big' name={'free code camp'} />
                  ข้อมูลค่าย
                </SecHeader>
                <div className='row'>
                  <Topic className='col'>ค่ายที่เคยเข้าร่วม :<textarea readOnly rows='5' className='form-control' type='text' value={info.profile_registrant.past_camp || ''} /></Topic>
                  <Topic className='col'>ทักษะคอมฯ :<textarea readOnly rows='5' className='form-control' type='text' value={info.profile_registrant.skill_computer || ''} /></Topic>
                  <Topic className='col'>อยากบอกพี่ว่า :<textarea readOnly rows='5' className='form-control' type='text' value={info.profile_registrant.tell_wipper || ''} /></Topic>
                </div>
              </div>
            </div>
            {/* <div className='row mb-5'>
              <div className='col-12'>
                <SecHeader className='mt-3'>
                  <Icon className='mr-3' size='big' name={'upload'} />
                  อัพโหลดเอกสาร
                </SecHeader>
                <div className='row mt-3'>
                  <Dropzone
                    accept={'image/png, image/jpeg, application/pdf'}
                    disabled={parentalAuth === documentStatus.APPROVE}
                    className='col' style={{position: 'relative'}}
                    onDragEnter={() => props.onDragEnter('parentalAuthen')}
                    onDragLeave={() => props.onDragLeave('parentalAuthen')}
                    onDrop={(files) => props.uploadFile(files, 'parental_authorization', info.user_id)}
                  >
                    <StyledDropzone
                      status={parentalAuth}
                    >
                      <div>
                        <b>เอกสารขออนุญาตผู้ปกครอง</b>
                        <GuideText color={parentalAuth}>
                          {parentalAuth !== 1 && `(คลิก หรือลากไฟล์มาวางเพื่ออัพโหลด)`}
                        </GuideText>
                      </div>
                      {
                        activeDrag.parentalAuthen && (
                          <AnimateUpload>
                            <Icon className='mr-3' size='huge' name={'cloud upload'} />
                          </AnimateUpload>
                        )
                      }
                      {props.loading.parental_authorization && (
                        <FlexContainer>
                          <Icon loading name='spinner' size='huge' />
                        </FlexContainer>
                      )}
                    </StyledDropzone>
                  </Dropzone>
                  <Dropzone
                    accept={'image/png, image/jpeg, application/pdf'}
                    disabled={transcript === documentStatus.APPROVE}
                    className='col' style={{position: 'relative'}}
                    onDragEnter={() => props.onDragEnter('transcript')}
                    onDragLeave={() => props.onDragLeave('transcript')}
                    onDrop={(files) => props.uploadFile(files, 'transcription_record', info.user_id)}
                  >
                    <StyledDropzone
                      status={transcript}
                    >
                      <div>
                        <b>เอกสารปพ.1</b>
                        <GuideText color={transcript} classNa>
                          {transcript !== 1 && `(คลิก หรือลากไฟล์มาวางเพื่ออัพโหลด)`}
                        </GuideText>
                      </div>
                      {
                        activeDrag.transcript && (
                          <AnimateUpload>
                            <Icon className='mr-3' size='huge' name={'cloud upload'} />
                          </AnimateUpload>
                        )
                      }
                      {props.loading.transcription_record && (
                        <FlexContainer>
                          <Icon loading name='spinner' size='huge' />
                        </FlexContainer>
                      )}
                    </StyledDropzone>
                  </Dropzone>
                </div>
              </div>
              <div className='col-12'>
                <h4>สีบอกอะไร ?:</h4>
                <Circle color={`#78E6D0`} >อนุมัติแล้ว</Circle>
                <Circle color={`#DF6760`} >ปฎิเสธเอกสาร</Circle>
                <Circle color={`#FFE52B`} >กำลังรออนุมัติ</Circle>
                <Circle color={`lightgray`} >ยังไม่ได้อัพโหลดเอกสารมาเลย</Circle>
                <p className='mt-2'>หากไม่ขึ้นสีที่กล่าวมาทั้งหมด 4 สี ลองรีเฟรชหน้าใหม่อีกคร้ัง</p>
                <p>สีเป็นการบอกสถานะของเอกสารที่ปรากฏอยู่</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Grid.Row>
  )
}

export default compose(
  withState('transcript', 'setTranscript', -2),
  withState('parentalAuth', 'setParentalAuthen', -2),
  withStateHandlers(
    ({initValue = {
      parental_authorization: false,
      transcription_record: false
    }}) => ({
      loading: initValue
    }),
    {
      setLoading: ({ loading }) => (key, status) => ({
        loading: {
          ...loading,
          [key]: status
        }
      })
    }
  ),
  withStateHandlers(
    ({initValue = {
      transcript: false,
      parentalAuthen: false
    }}) => ({
      activeDrag: initValue
    }),
    {
      onDragEnter: ({ activeDrag }) => (key) => ({
        activeDrag: {
          ...activeDrag,
          [key]: true
        }
      }),
      onDragLeave: ({ activeDrag }) => (key) => ({
        activeDrag: {
          ...activeDrag,
          [key]: false
        }
      }),
      leaveDrag: () => () => ({
        activeDrag: {
          transcript: false,
          parentalAuthen: false
        }
      })
    }
  ),
  withHandlers({
    uploadFile: (props) => async (files, key, userId) => {
      props.leaveDrag()
      if (files[0].size <= 2097152 && userId) {
        props.setLoading(key, true)
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('fileType', key)
        formData.append('userId', userId)
        let { token } = await getCookie({req: false})
        const headers = { Authorization: `Bearer ${token}` }
        api.post('/uploads', formData, headers)
          .then(res => {
            props.setLoading(key, false)
            if (key.indexOf('transcript') > -1) {
              props.setTranscript(null)
            } else {
              props.setParentalAuthen(null)
            }
          })
      }
    }
  }),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      const { props } = this
      if (props.transcript === -2 || props.parentalAuth === -2) {
        let transcript = getDocumentStatus(filetype.TRANSCRIPTION_RECORD, props.info)
        let parental = getDocumentStatus(filetype.PARENTAL_AUTHORIZATION, props.info)
        props.setParentalAuthen(parental)
        props.setTranscript(transcript)
      }
    }
  })
)(Tab1)
