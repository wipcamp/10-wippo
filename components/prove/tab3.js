import React from 'react'
import ItimCard from '../general/itimcard'
import {Grid, Image} from 'semantic-ui-react'
import styled from 'styled-components'
const ItimImage = '/static/img/itim-profileImg.jpg'
const transcript = '/static/img/parentConfirmation.jpg'
const EnhancedImage = styled(Image)`
margin:2%;
`
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
            <EnhancedImage src={transcript} size={'large'} centered />
            {console.log(props)}
            {props.button}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
)
export default Tab3
