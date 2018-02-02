import React from 'react'
import {Grid, Image, Button} from 'semantic-ui-react'
import ItimCard from '../general/itimcard'
import styled from 'styled-components'
const parentPermission = '/static/img/parentPermission.jpg'
const ItimImage = '/static/img/itim-profileImg.jpg'
const EnhancedImage = styled(Image)`
margin:2%;
`

class Tab3 extends React.Component {
  render () {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <ItimCard src={ItimImage} name={'Phachara kamdor'} school={'kmutt'} join={'30 JAN 2018'} />
            </Grid.Column>
            <Grid.Column width={12} textAlign={'center'}>
              <EnhancedImage src={parentPermission} size={'large'} centered />
              <Button.Group>
                <Button>Reject</Button>
                <Button.Or />
                <Button color='yellow'>Pending</Button>
                <Button.Or />
                <Button >Approved</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
export default Tab3
