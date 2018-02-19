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

const Tab2 = ({info, image, path, button, fileType}) => (
  (
    <Grid.Row>
      <div className='container'>
        <div className='row'>
          <div className='col-6 col-md-2'>
            <ItimCard src={image} name={`น้อง ${info.nickname}`} school={info.edu_name} join={info.created_at} />
          </div>
          <div className='col-12 col-md-10 d-flex flex-column justify-content-center align-items-center'>
            {
              fileType === 'pdf'
                ? <PDF src={`${env.URL}${path}`} href={`${env.URL}${path}`} />
                : <ImageCustom src={`${env.URL}${path}`} size='large' href={`${env.URL}${path}`} />
            }
            <h3>เหตุผล (หากไม่ผ่าน)</h3>
            <textarea placeholder='ใส่เหตุผลที่นี่' className='form-control' />
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
