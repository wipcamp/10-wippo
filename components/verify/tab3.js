import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Image } from 'semantic-ui-react'
import env from '../util/env'

const Tab3 = ({info, image, path, button}) => (
  (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <ItimCard src={image} name={info.name} school={info.edu_name} join={info.created_at} />
          </Grid.Column>
          <Grid.Column width={12} textAlign={'center'}>
            <Image src={`${env.API_URL}${path}`} size='large' href={`${env.API_URL}${path}`} />
            {button}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
)
export default Tab3
