import React from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
const Idtitle = styled.h3`
  background-color:#333;
  color:#fff;
  padding:0.8em 0em 0.8em 2.5em;
  border-radius:5px;
  width:100%;
  align-self:flex-start;
`
const Box = styled.div`
  background-color:#fff;
  width:100%;
  box-shadow : 0px 1px 15px 1px rgba(81, 77, 92, 0.14);
  padding:1em;
  border-radius:5px;
`
const ProfileImage = styled.img`
  max-width:450px !important;
  display:flex;
  margin:0 auto;
`
const Title = styled.h3`
  padding-left:2.5em;
`
const Text = styled.span`
  font-weight:normal;
`
const FacebookButton = styled.button`
  margin:0 auto;
  width:42.2%;
  margin-left: 28.9%;
  margin-top: 1%;
  background: #55b0d8;
  color: #fff;
  border: 0;
  font-size: 1.6em;
  padding: 0.2em 0;
  outline:0 !important;
  transition:0.7s;
  &:hover{
    background:#53a4c7;
  }
`
export default class StaffApprove extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      camper: {
        profile_registrant: {}
      }
    }
  }
  componentWillMount = async () => {
    let {data} = await Axios.get(`http://localhost:8000/api/v1/staffs/${this.props.id}`)
    this.setState({
      camper: data[0]
    })
  }
  render () {
    return (
      <div>
        <Box>
          <Idtitle>WIPID #</Idtitle>
          <ProfileImage className='' src='https://scontent.fbkk2-3.fna.fbcdn.net/v/t1.0-9/19665475_1397373506976550_3785411902592413247_n.jpg?oh=4ab6299c08fa8d1c17bc6507f10627ec&oe=5B0463F3' />
          <div style={{width: '100%'}}>
            <a href='#'><FacebookButton><i className='fab fa-facebook' /></FacebookButton></a>
            {/* <a href={`https://facebook.com/${this.state.staff.user.provider_acc}`} target='_blank'><FacebookButton><i className='fab fa-facebook' /></FacebookButton></a> */}
          </div>
          {/* <ProfileImage src={`https://graph.facebook.com/${this.state.staff.user.provider_acc}/picture?width=99999`} /> */}
          <Title>Student ID : <Text>test</Text></Title>
          <Title>Facebook Name : <Text>test</Text></Title>
          <Button.Group style={{display:'flex'}}>
            <Button negative>Cancel</Button>
            <Button.Or />
            <Button positive>Accept</Button>
          </Button.Group>
        </Box>
        {/* <p>Name : {this.state.camper.first_name} {this.state.camper.last_name}</p>
        <p>Nickname : {this.state.camper.nickname}</p>
        <p>Gender : {this.state.camper.gender === 1 ? (<span>male</span>) : (<span>female</span>)}</p> */}
        {/* <Link href='/itim'><a><Button color='teal'>Back</Button></a></Link> */}
      </div>
    )
  }
}
