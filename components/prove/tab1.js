import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Form, Input, TextArea, Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const ItimImage = '/static/img/itim-profileImg.jpg'

const TabStyle = styled.div`
height:100%;
.ui.padded.grid{
  height:100%;
}
`
const InfoSeg = styled(Segment)`
margin:6px;
`

const Tab1 = ({ info }) => (
  <div>
    {console.log(info)}
    <TabStyle>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <ItimCard src={ItimImage} name={info.nickname} school={''} join={'undifined'} />
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
                      <span>ชื่อ :</span><Form.Field readOnly control={Input} value={info.first_name} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <span>นามสกุล :</span><Form.Field readOnly control={Input} value={info.last_name} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <span>โรค :</span><Form.Field readOnly control={Input} value={info.congenital_diseases} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <span>ยารักษา :</span><Form.Field readOnly control={Input} value={info.congenital_drugs} />
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
                      <span>โรงเรียน :</span><Form.Field readOnly control={Input} value={"info.profile_registrant"} />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <span>ลำดับชั้น :</span><Form.Field readOnly control={Input} value={"info.profile_registrant.edu_lv"} />
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <span>เกรด :</span><Form.Field readOnly control={Input} value={"info.profile_registrant.edu_gpax"} />
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
                    <Grid.Column centered>
                      <Form>
                        <Form.Group>
                          <Form.Field width={5} control={TextArea} label='About' />
                          <Form.Field width={5} control={TextArea} label='About' />
                          <Form.Field width={6} control={TextArea} label='About' />
                        </Form.Group>
                      </Form>
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
export default Tab1
