import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Form, Input, TextArea ,Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const ItimImage = '/static/img/itim-profileImg.jpg'

const TabStyle = styled.div`
height:100%;
.ui.padded.grid{
  height:100%;
}
`
const InfoSeg = styled(Segment)`
margin:4px;
padding:2px;
`

class Tab1 extends React.Component {
  constructor (props) {
    super()
  }
  render () {
    return (
      <div>
        <TabStyle>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <ItimCard src={ItimImage} name={'Phachara kamdor'} school={'kmutt'} join={'30 JAN 2018'} />
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid.Row>
                  <InfoSeg>
                    <Grid>
                      <Grid.Row>
                        <Icon name={'user'} />
                        <span>ข้อมูลส่วนตัว</span>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <span>ชื่อ :</span><Form.Field readOnly control={Input} value={'พชร'} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <span>นามสกุล :</span><Form.Field readOnly control={Input} value={'กำดอ'} />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <span>โรค :</span><Form.Field readOnly control={Input} value={'Phachara'} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <span>ยารักษา :</span><Form.Field readOnly control={Input} value={'Phachara'} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </InfoSeg>
                </Grid.Row>
                <Grid.Row>
                  <InfoSeg>
                    <Grid>
                      <Grid.Row>
                        <Icon name={'pencil'} />
                        <span>ข้อมูลการศึกษา</span>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={6}>
                          <span>โรงเรียน :</span><Form.Field readOnly control={Input} value={'Phachara'} />
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <span>ลำดับชั้น :</span><Form.Field readOnly control={Input} value={'Phachara'} />
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <span>เกรด :</span><Form.Field readOnly control={Input} value={'Phachara'} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </InfoSeg>
                </Grid.Row>
                <Grid.Row>
                  <InfoSeg>
                    <Grid>
                      <Grid.Row>
                        <Icon name={'free code camp'} />
                        <span>ข้อมูลค่าย</span>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={7}>
                          <span>ค่ายที่เคยเข้า :</span><Form.Field readOnly control={TextArea} value={'Phachara'} />
                        </Grid.Column>
                        <Grid.Column width={7}>
                          <span>กิจกรรม :</span><Form.Field readOnly control={TextArea} value={'Phachara'} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </InfoSeg>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </TabStyle>
      </div>
    )
  }
}

export default Tab1
