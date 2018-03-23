import React from 'react'
import {Radar} from 'react-chartjs-2'
import styled from 'styled-components'

const Page = styled.div`
  height:100vh;
  width:100vw;
  overflow-x:hidden;

`
const Card = styled.div`
  width :65%;
  height:30%;
  background: linear-gradient(135deg, #00c5dc 30%, #716aca 100%);
  color:#fff;
  padding:2%;
  display:block;
  margin-left:1%;
  margin-right:1%;
  margin-top:2%;
  border: 0px solid transparent;
  border-radius: .5em;
  overflow:hidden;
`

const DivInCard = styled.div`
  width: 45%;
  margin-top: -20%;
  margin-left:20%;
  `
const Output =styled.ul`
  margin-left:22.2%;
  margin-top:10px;
  text-align:center;
  color:#000;
  list-style-type:none;
`
  const Li = styled.li`
  margin: 10px;
  float:left;
`
const Avatar = styled.img`
  width:15%;
  height:auto;
  margin:1%;
  border:2px solid #000;
  border-radius:.5em;
  overflow:hidden;
`
const Profile = styled.div`
  margin-top:-15%;
  margin-left:70%;
  border: 2px solid #000;
  border-radius:.4em;
  display:block;
  width:20%;
  height:auto;
  padding:.3em;
`

const Button = styled.button`
  background: #e35;
  color:#fff;
  padding: .2em;
  margin-left:90%;
  margin-top:7%;
  border: 1px solid #000;
  border-radius:.2em;
`

export default class Itimstat extends React.Component {
  state = { 
    data: {
      labels: ['ด้าน 1', 'ด้าน 2', 'ด้าน 3'],
      datasets: [
        {
          label: 'คะแนน',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [5, 9, 10]
        }
      ]
    }
   }
  render() {
    return (
      <Page>
        <Card>
          <Avatar src="/static/img/avata-mockup.jpg"/>

        <DivInCard >
          <Radar data={this.state.data} />
            <Output>
              <Li>A : 5</Li>
              <Li>B : 9</Li>
              <Li>C : 10</Li>
            </Output>
        </DivInCard>
        <Profile>
          <p>ชื่อ: ไข่   นามสกุล: แมว</p>
          <p>โรงเรียน: อนุบาลหมีน้อย</p>
        </Profile>
        <Button type="submit">submit</Button>
        </Card>
      </Page>
    )
  }
}
