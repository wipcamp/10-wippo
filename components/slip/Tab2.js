import React from 'react'
import styled from 'styled-components'
import ItimCard from '../general/itimcard'
import { Grid, Image } from 'semantic-ui-react'
import env from '../util/env'

export const ImageCustom = styled(Image)`
  min-width: 100%;
`

export const PDF = styled.embed`
  min-height: 500px;
  min-width: 100%;
`

const Tab2 = ({fullName, profile, button, image, facebook, fileType, path, comment, setComment}) => (
  (
    <Grid.Row>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-3'>
            <ItimCard
              question={6}
              fullName={fullName}
              telno={profile.profile_registrant.telno_personal}
              id={profile.profile_registrant.user_id}
              src={image}
              name={`น้อง ${profile.nickname}`}
              facebook={facebook}
            />
          </div>
          <div className='col-12 col-md-9 d-flex flex-column justify-content-center align-items-center'>
            <h1>หลักฐานยืนยันการโอนเงิน</h1>
            {
            // fileType === 'pdf'
            //   ? <PDF src={`${process.env.URL}${path}`} href={`${process.env.URL}${path}`} />
            //   : <ImageCustom src={`${process.env.URL}${path}`} size='large' href={`${process.env.URL}${path}`} />
              fileType === 'pdf'
                ? <PDF src={`${process.env.URL}${path}`} href={`${process.env.URL}${path}`} />
                : <ImageCustom src={`${process.env.URL}${path}`} size='large' href={`${process.env.URL}${path}`} />
            }
            <h3>เหตุผล (หากไม่ผ่าน)</h3>
            <textarea
              onChange={setComment}
              value={comment}
              placeholder='ใส่เหตุผลที่นี่'
              className='form-control' />
            <div className='mt-3'>
              {button}
            </div>
          </div>
        </div>
      </div>
    </Grid.Row>
  )
)
export default Tab2
