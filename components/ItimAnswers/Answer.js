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
const Question = styled.div`
  font-family: 'Kanit', sans-serif !important;
  font-size:27px;
  margin-top: 1em;
  margin-bottom: 1em;

`
const info = () => {

}

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
            <div className='row card'>
              <div className='col-12 text-center'>
                <Question>{`"กออะไรกอไก่"`}</Question>
              </div>
            </div>
            <div style={{marginTop: '2.5em'}} className='row'>
              <SecHeader className='mt-3'>
                <Icon size='big' name={'info'} />
                คำตอบ
              </SecHeader>
            </div>
            <div className='row card'>
              <div className='col-12 text-center'>
                <Question>{`"กอไก่ไง"`}</Question>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid.Row>
  )
}

export default Answer
