import React from 'react'
import Axios from 'axios'
import { Grid, Button } from 'semantic-ui-react'
import Link from 'next/link'
import styled from 'styled-components'

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
`
const BoxInner = styled.div`
`
const ProfileImage = styled.img`
  max-width:150px !important;
  border-radius:50%;
`
const Text = styled.span`
  font-weight:normal;
`
export default class ItimProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      camper: {
        profile_registrant: {}
      }
    }
  }
  componentWillMount = async () => {
    let {data} = await Axios.get(`http://localhost:8000/api/v1/registrants/${this.props.id}`)
    data = data.map(profile => {
      return {
        ...profile,
        fullname: `${profile.first_name} ${profile.last_name}`
      }
    })
    this.setState({
      camper: data[0]
    })
  }
  render () {
    return (
      <div>
        <Box>
          <Idtitle>WIPID #{this.state.camper.user_id}</Idtitle>
          <BoxInner>
            <ProfileImage src='https://scontent.fbkk12-2.fna.fbcdn.net/v/t31.0-8/27983341_10155366148776094_7042545821156866325_o.jpg?oh=475e290821f6df193e8f87f9d1100299&oe=5B076C8B' />
            <h1>น้อง{this.state.camper.nickname} ({this.state.camper.gender_id === 1 ? <span>ชาย</span> : <span>หญิง</span>})</h1>
            <h3>ชื่อ - นามสกุล : <Text>{this.state.camper.first_name} {this.state.camper.last_name}</Text></h3>
            <h3>Name - Surname : <Text>{this.state.camper.first_name_en} {this.state.camper.last_name_en}</Text></h3>
            <hr />
            <h2>ประวัติการศึกษา</h2>
            <h3>โรงเรียน : <Text>{this.state.camper.profile_registrant.edu_name}</Text></h3>
            <h3>สายการเรียน : <Text>{this.state.camper.profile_registrant.edu_major}</Text></h3>
            <h3>ลำดับชั้น : <Text>{this.state.camper.profile_registrant.edu_lv}</Text></h3>
            <h3>เกรดเฉลี่ย : <Text>{this.state.camper.profile_registrant.edu_gpax}</Text></h3>
            <hr />
            <h2>ข้อมูลทั่วไป</h2>
            <h3>วัน / เดือน / ปี เกิด : <Text>{this.state.camper.birth_at}</Text></h3>
            <h3>กรุ๊ปเลือด : <Text>{this.state.camper.blood_group}</Text></h3>
            <h3>ศาสนา : <Text>{this.state.camper.religion_id}</Text></h3>
            <h3>เลขบัตรประจำตัวประชาชน : <Text>{this.state.camper.citizen_id}</Text></h3>
            <hr />
            <h2>ข้อมูลการติดต่อ</h2>
            <h3>เบอร์โทรศัพท์ : <Text>{this.state.camper.profile_registrant.telno_personal}</Text></h3>
            <h3>โรคประจำตัว : <Text>{this.state.camper.congenital_diseases}</Text></h3>
            <h3>ยาประจำตัว : <Text>{this.state.camper.congenital_drugs}</Text></h3>
            <hr />
            <h2>ข้อมูลเพิ่มเติม</h2>
            <h3>ทักษาคอม : <Text>{this.state.camper.profile_registrant.skill_computer}</Text></h3>
            <h3>ค่ายที่เคยเข้า : <Text>{this.state.camper.profile_registrant.past_camp}</Text></h3>
            <h3>กิจกรรม : <Text>{this.state.camper.profile_registrant.activities}</Text></h3>
            <h3>รู้จักค่ายนี้จาก : <Text>{this.state.camper.profile_registrant.known_via}</Text></h3>
            
          </BoxInner>
        </Box>
        {/* <p>Name : {this.state.camper.first_name} {this.state.camper.last_name}</p>
        <p>Nickname : {this.state.camper.nickname}</p>
        <p>Gender : {this.state.camper.gender === 1 ? (<span>male</span>) : (<span>female</span>)}</p> */}
        {/* <Link href='/itim'><a><Button color='teal'>Back</Button></a></Link> */}
      </div>
    )
  }
}
