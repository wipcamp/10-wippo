import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'

const ItimImage = '/static/img/itim-profileImg.jpg'

const TabStyle = styled.div`
font-size: 1.1em;
height:100%;
.ui.padded.grid{
  height:100%;
}
`

const Sdata = styled.span`
  margin-left:16px;
  font-size: 1.4em;  
`

class Tab1 extends React.Component {
  render () {
    return (
      <div>
        <TabStyle>
          <Grid>
            <Grid.Row >
              <Grid.Column width={4}>
                <ItimCard src={ItimImage} name={'Phachara kamdor'} school={'kmutt'} join={'30 JAN 2018'} />
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid padded>
                  <Grid.Row>
                    <Grid.Column width={8} >
                      <span>ชื่อ :</span><Sdata>กำดอ</Sdata>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <span>นามสกุล :</span><Sdata>กำดอ</Sdata>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <span>ศาสนา :</span><Sdata>ลุ่งตู่</Sdata>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <span>วันเกิด :</span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <span>กรุ๊ปเลือด :</span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <span>โรค :</span>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <span>ยารักษา :</span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <span>โรงเรียน :</span>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <span>ลำดับชั้น :</span>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <span>เกรด :</span>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={7}>
                      <span>ค่ายที่เคยเข้า :</span>
                    </Grid.Column>
                    <Grid.Column width={7}>
                      <span>กิจกรรม :</span>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </TabStyle>
      </div>
    )
  }
}

export default Tab1
