import React from 'react'
import ItimCard from '../general/itimcard'
import {Grid, Image, Button} from 'semantic-ui-react'
import styled from 'styled-components'
const ItimImage = '/static/img/itim-profileImg.jpg'
const transcript = '/static/img/transcript.jpg'
const EnhancedImage = styled(Image)`
margin:2%;
`

class Tab2 extends React.Component {
  constructor (props) {
    super()
    this.state = {
      docStatus: 'pending'// approved,pending,rejected
    }
  }

  render () {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <ItimCard src={ItimImage} name={'Phachara kamdor'} school={'kmutt'} join={'30 JAN 2018'} />
            </Grid.Column>
            <Grid.Column width={12} textAlign={'center'}>
              <EnhancedImage src={transcript} size={'large'} centered />
              <Button.Group>
                {this.state.docStatus === 'reject' ? <Button color='red' >Reject </Button> : <Button onClick={console.log('Im clicked')} >Reject </Button>}
                <Button.Or />
                {console.log(this.state.docStatus)}
                {this.state.docStatus === 'pending' ? <Button color='yellow' >Pending</Button> : <Button>Pending</Button>}
                <Button.Or />
                {this.state.docStatus === 'approve' ? <Button color='green' >Approved </Button> : <Button >Approved </Button>}
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
export default Tab2
