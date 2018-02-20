import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const SecHeader = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:25px;
`
const Topic = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:18px;
  margin-top: 1em;
`

const Tab1 = ({ fullName, info, image, path }) => {
  return (
    <Grid.Row>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-2'>
            <ItimCard
              fullName={fullName}
              src={image}
              name={`น้อง ${info.nickname}`}
              school={''}
              join={info.created_at} />
          </div>
          <div className='col-12 col-md-10'>
            <SecHeader className='mt-3'>
              <Icon size='big' name={'user'} />
              ข้อมูลส่วนตัว
            </SecHeader>
            <div className='row'>
              <Topic className='col'>ชื่อ : <input readOnly className='form-control' type='text' value={info.first_name || ''} /></Topic>
              <Topic className='col'>นามสกุล :<input readOnly className='form-control' type='text' value={info.last_name || ''} /></Topic>
            </div>
            <div className='row'>
              <Topic className='col'>โรค :<input readOnly className='form-control' type='text' value={info.congenital_diseases || ''} /></Topic>
              <Topic className='col'>ยาที่แพ้ :<input readOnly className='form-control' type='text' value={info.congenital_drugs || ''} /></Topic>
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
          </div>
        </div>
      </div>
    </Grid.Row>
  )
}

export default Tab1
