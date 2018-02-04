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
              <EnhancedImage src={parentPermission} size={'large'} centered />
              <Button.Group>
                {this.state.docStatus === 'reject' ? <Button color='red' >Reject </Button> : <Button onClick={() => this.setState({docStatus: 'reject'})} >Reject </Button>}
                <Button.Or />
                {console.log(this.state.docStatus)}
                {this.state.docStatus === 'pending' ? <Button color='yellow' >Pending</Button> : <Button onClick={() => this.setState({docStatus: 'pending'})}>Pending</Button>}
                <Button.Or />
                {this.state.docStatus === 'approve' ? <Button color='green' >Approved </Button> : <Button onClick={() => this.setState({docStatus: 'approve'})}>Approved </Button>}
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
export default Tab3
