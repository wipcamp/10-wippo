import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Image } from 'semantic-ui-react'
const ItimImage = '/static/img/itim-profileImg.jpg'
const transcript = '/static/img/ParentPermission.jpg'

const Tab3 = (props) => (
  (
    <div>
      {/* {console.log(props)} */}
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <ItimCard src={ItimImage} name={'Phachara kamdor'} school={'kmutt'} join={'30 JAN 2018'} />
          </Grid.Column>
          <Grid.Column width={12} textAlign={'center'}>
            <Image src={transcript} size='large' href='ItimImage' />
            {props.button}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
)
export default Tab3
