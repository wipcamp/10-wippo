import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid } from 'semantic-ui-react'
import { ImageCustom, PDF } from './tab2'
import env from '../util/env'

const Tab3 = ({info, image, path, button, fileType}) => (
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
export default Tab3
