import React from "react"
import { Radar } from "react-chartjs-2"
import styled from "styled-components"

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`
const Card = styled.div`
  width: 100%;
  // height:30%;
  background: linear-gradient(135deg, #00c5dc 30%, #716aca 100%);
  color: #fff;
  padding: 2%;
  display: block;
  margin-top: 2%;
  border: 0px solid transparent;
  border-radius: 0.5em;
  overflow: hidden;
`

const DivInCard = styled.div`
  width: 100%;
`

const Output = styled.ul`
  margin-left: 22.2%;
  // margin-top:10px;
  // text-align:center;
  color: #000;
  list-style-type: none;
`

const Li = styled.li`
  margin: 10px;
  float: left;
`

const Avatar = styled.img`
  height: 200px;
  border: 2px solid #000;
  border-radius: 0.5em;
  overflow: hidden;
`

const Profile = styled.div`
  border: 2px solid #000;
  border-radius: 0.4em;
  display: block;
  width: 100%;
  height: auto;
  padding: .5em;
`

const Button = styled.button`
  background: #e35;
  color: #fff;
  padding: 0.4em;
  width: 15%;
  border: 1px solid #000;
  border-radius: 0.2em;
  margin-top:4%;
  cursor: pointer;
`
const Badge = styled.span`
  padding:.2em;
  margin:1%;
  font-size:20px;
`
const Header = styled.h1`
  margin-top:1em;
  font-size:3.5em;
`

const CardCustom = ({ data }) => (
  <Card className="col-12">
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-3 d-flex justify-content-center">
        <Avatar src="/static/img/avata-mockup.jpg" />
      </div>
      <DivInCard className="col-4">
        <Radar data={data} />
        <div className="text-center">
          <Badge className="badge badge-primary">A : 5</Badge>
          <Badge className="badge badge-success">B : 9</Badge>
          <Badge className="badge badge-danger">C : 10</Badge>
        </div>
      </DivInCard>
      <div className="col-5">
        <Profile className="px-3">
          <p>WIP ID : 100001&nbsp;&nbsp;&nbsp;ชื่อเล่น : น้องเอ๋ย&nbsp;&nbsp;&nbsp;เบอร์โทร : 088-888-8888</p> 
          <p>ชื่อ: อับบราฮัม&nbsp;&nbsp;&nbsp;นามสกุล: มีบุตรเจ็ดคน</p>
          <p>โรค : -&nbsp;&nbsp;&nbsp;อาหารที่แพ้ : -&nbsp;&nbsp;&nbsp;กรุ้ปเลือด : B</p>
          <p>จังหวัด : กรุงเทพ&nbsp;&nbsp;&nbsp;เขต : ทุ่งครุ</p>
          <p>เบอร์ผู้ปกครอง : 0999999999&nbsp;&nbsp;&nbsp;ความสัมพันธ์ : มารดา</p>
          <p>โรงเรียน: อนุบาลหมีน้อย&nbsp;&nbsp;&nbsp;ลำดับชั้น : ม.5 ขึ้น ม.6&nbsp;&nbsp;&nbsp;สายการเรียน : วิทย์-คณิต   </p>
          <p>เกรดเฉลีย : 3.5 &nbsp;&nbsp;&nbsp;</p>
          <p>ค่ายที่เคยเข้าร่วม : อิอิ</p>
          <p>ทักษะคอม : ไม่มี  </p>
        </Profile>
        <div className="text-center">
          <Button type="submit">submit</Button>
        </div>
      </div>
    </div>
  </Card>
)

export default class Itimstat extends React.Component {
  state = {
    data: {
      labels: ["ด้าน 1", "ด้าน 2", "ด้าน 3"],
      datasets: [
        {
          label: "คะแนน",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [5, 9, 10]
        }
      ]
    }
  }
  render() {
    return (
      <Page className="contianer-fluid">
        <div className="container">
          <div className="row">
            <div/>
            <Header>Itim Stats</Header>
            {[1, 1, 1, 1].map(() => <CardCustom data={this.state.data} />)}
          </div>
        </div>
      </Page>
    )
  }
}
