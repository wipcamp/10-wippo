/* global FormData */
import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Icon } from 'semantic-ui-react'
import styled, { keyframes } from 'styled-components'
import getCookie from '../util/cookie'
import api from '../util/axios'

const SecHeader = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:25px;
`
const Topic = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:18px;
  margin-top: 1em;
`

const documentStatus = {
  NOT_FOUND: -1,
  APPROVE: 1,
  REJECTED: 0,
  PENDING: null
}

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

const Tab1 = (props) => {
  const { fullName, profile, image, facebook } = props
  return (
    <Grid.Row>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-3'>
            <ItimCard
              question={6}
              fullName={fullName}
              id={profile.profile_registrant.user_id}
              src={image}
              name={`น้อง ${profile.nickname}`}
              facebook={facebook}
            />
          </div>
          <div className='col-12 col-md-9'>
            <SecHeader className='mt-3'>
              <Icon size='big' name={'user'} />
              ข้อมูลส่วนตัว
            </SecHeader>
            <div className='row'>
              <Topic className='col'>WIP ID :<input readOnly className='form-control bg-danger text-white' type='text' value={profile.profile_registrant.user_id || ''} /></Topic>
              <Topic className='col'>เบอร์โทร :<input readOnly className='form-control bg-danger text-white' type='text' value={profile.profile_registrant.telno_personal || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>เลขประจำตัวประชาชน : <input readOnly className='form-control' type='text' value={profile.citizen_id || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>ชื่อ : <input readOnly className='form-control' type='text' value={profile.first_name || ''} /></Topic>
              <Topic className='col'>นามสกุล :<input readOnly className='form-control' type='text' value={profile.last_name || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>โรค :<input readOnly className='form-control' type='text' value={profile.congenital_diseases || ''} /></Topic>
              <Topic className='col'>ยาประจำตัว :<input readOnly className='form-control' type='text' value={profile.congenital_drugs || ''} /></Topic>
              <Topic className='col'>อาหารที่แพ้ :<input readOnly className='form-control' type='text' value={profile.allergic_foods || ''} /></Topic>
              <Topic className='col'>กรุ๊บเลือด :<input readOnly className='form-control' type='text' value={profile.blood_group || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>เบอร์โทรผู้ปกครอง : <input readOnly className='form-control' type='text' value={profile.profile_registrant.telno_parent || ''} /></Topic>
              <Topic className='col'>ความสัมพันธ์ :<input readOnly className='form-control' type='text' value={profile.profile_registrant.parent_relation || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>จังหวัด :<input readOnly className='form-control' type='text' value={profile.profile_registrant.addr_prov || ''} /></Topic>
              <Topic className='col'>เขต : <input readOnly className='form-control' type='text' value={profile.profile_registrant.addr_dist || ''} /></Topic>
            </div>
          </div>
        </div>
      </div>
    </Grid.Row>
  )
}

export default Tab1
