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

const Answer = ({ question, fullName, info }) => {
  return (
    <Grid.Row>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-3'>
            <ItimCard
              fullName={fullName}
              id={info.user_id}
              name={`น้อง ${info.nickname}`}
            />
          </div>
          <div className='col-12 col-md-9'>
            <SecHeader className='mt-3'>
              <Icon size='big' name={'question'} />
              คำถาม
            </SecHeader>
            <div className='row'>
              <Topic className='col'>WIP ID :<input readOnly className='form-control bg-danger text-white' type='text' value={info.user_id || ''} /></Topic>
              <Topic className='col'>เบอร์โทร :<input readOnly className='form-control bg-danger text-white' type='text' /></Topic>
            </div>
            <div className='row'>
              <SecHeader className='mt-3'>
                <Icon size='big' name={'info'} />
                คำตอบ
              </SecHeader>
            </div>
          </div>
        </div>
      </div>
    </Grid.Row>
  )
}

export default Answer
