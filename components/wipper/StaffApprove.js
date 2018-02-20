import React from 'react'
import axios from '../util/axios'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import getCookie from '../util/cookie'
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
      staff: {},
      stdId: 0
    }
  }
  componentDidMount = async () => {
    let staffData = await this.fetchStaff()
    let {data} = await this.fetchUser(staffData.data.user_id)
    this.setState({
      staff: data
    })
    console.log(data)
  }
  fetchStaff = async () => {
    let {token} = await getCookie({req: false})
    let {data} = await axios.get(`/staffs/${this.props.id}`, {
      Authorization: `Bearer ${token}`
    })
    this.setState({
      stdId: data.data.student_id
    })
    return data
  }
  fetchUser = async (userId) => {
    let {token} = await getCookie({req: false})
    let {data} = await axios.get(`/users/${userId}`, {
      Authorization: `Bearer ${token}`
    })
    return data
  }
  assignRole = async (userId) => {
    let {token} = await getCookie({req: false})
    console.log(token)
    let {result} = await axios.post(`/staffs/${userId}/roles`, {
      Authorization: `Bearer ${token}`
    })
    console.log(result)
  }
  render () {
    return (
      <div>
        <Box>
          <Idtitle>WIPID #{this.state.staff.id}</Idtitle>
          <ProfileImage src={`https://graph.facebook.com/${this.state.staff.provider_acc}/picture?width=99999`} />
          <div style={{width: '100%'}}>
            <a href={`https://facebook.com/${this.state.staff.provider_acc}`} target='_blank'><FacebookButton><i className='fab fa-facebook' /></FacebookButton></a>
          </div>
          <Title>Student ID : <Text>{this.state.stdId}</Text></Title>
          <Title>Facebook Name : <Text>{this.state.staff.account_name}</Text></Title>
          <Button.Group style={{display:'flex'}}>
            <Button negative>Cancel</Button>
            <Button.Or />
            <Button positive onClick={() => this.assignRole(this.state.staff.id)}>Verify</Button>
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
