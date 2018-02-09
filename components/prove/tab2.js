import React from 'react'
import ItimCard from '../general/itimcard'
import {Grid, Image} from 'semantic-ui-react'
import styled from 'styled-components'
import ImageZoom from 'react-medium-image-zoom'
const ItimImage = '/static/img/itim-profileImg.jpg'
const transcript = '/static/img/transcript.jpg'


const Tab2 = (props) => (
  (
    <div>
      {/* {console.log(props)} */}
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <ItimCard src={ItimImage} name={'Phachara kamdor'} school={'kmutt'} join={'30 JAN 2018'} />
          </Grid.Column>
          <Grid.Column width={12} textAlign={'center'}>
            <ImageZoom image={{
              src: transcript,
              style: { width: '30em', display: 'block', marginLeft: '17em', marginButtom: '8em' }
            }} zoomImage={{
              src: transcript
            }}
            />
            {console.log(props)}
            {props.button}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
)
export default Tab2
