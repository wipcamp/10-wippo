import React from 'react'
import {Grid, Image, Button} from 'semantic-ui-react'
import ItimCard from '../general/itimcard'
const parentPermission = '/static/img/parentPermission.jpg'
const ItimImage = '/static/img/itim-profileImg.jpg'

class Tab3 extends React.Component {
  render () {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <ItimCard src={ItimImage} name={'Phachara kamdor'} school={'kmutt'} join={'30 JAN 2018'} />
            </Grid.Column>
            <Grid.Column width={12}>
              ปพ.
              <Image src={parentPermission} fluid />
            </Grid.Column>
          </Grid.Row>
          <Button.Group>
            <Button>Reject</Button>
            <Button.Or />
            <Button color='yellow'>Pending</Button>
            <Button.Or />
            <Button >Approved</Button>
          </Button.Group>
        </Grid>
      </div>
    )
  }
}
export default Tab3