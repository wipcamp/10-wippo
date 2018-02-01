import React from 'react'
import styled from 'styled-components'
import Header from './header'
import { Container, Grid } from 'semantic-ui-react'
const SubHeader = styled.div`
  padding: 50px 25px 0 0px;
`
const SubHeaderText = styled.h3`
  font-weight: 500;
  font-size: 1.6em;
  color: #3f4047;
  font-family: 'Roboto', sans-serif;
`

class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dropdown: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  toggleDropdown () {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  render () {
    return (
      <div>
        <Header />
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <SubHeader>
                  <SubHeaderText>{this.props.subheadertext}</SubHeaderText>
                </SubHeader>
              </Grid.Column>
            </Grid.Row>
            {this.props.children}
          </Grid>
        </Container>
      </div>
    )
  }
}
export default Layout
