import React from 'react'
import ItimCard from '../general/itimcard'
import { Grid, Form, Input, TextArea, Segment, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const TabStyle = styled.div`
height:100%;
.ui.padded.grid{
  height:100%;
}
`
const InfoSeg = styled(Segment)`
margin:6px;
`

const SecHeader = styled.span`
font-size:25px;
`

const Tab1 = ({ info, image, path }) => {
  return (
    <div>
      <TabStyle>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <ItimCard src={image} name={info.nickname} school={''} join={info.created_at} />
            </Grid.Column>
            <Grid.Column width={12}>
              <Grid.Row>
                <InfoSeg padded>
                  <Grid padded={'horizontally'}>
                    <Grid.Row>
                      <Icon name={'user'} />
                      <SecHeader>ข้อมูลส่วนตัว</SecHeader>
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
                <InfoSeg padded>
                  <Grid>
                    {console.log(info)}
                    <Grid.Row>
                      <Icon name={'pencil'} />
                      <SecHeader>ข้อมูลการศึกษา</SecHeader>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <span>โรงเรียน :</span><Form.Field readOnly control={Input} value={info.profile_registrant.edu_name} />
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <span>ลำดับชั้น :</span><Form.Field readOnly control={Input} value={info.profile_registrant.edu_lv} />
                      </Grid.Column>
                      <Grid.Column width={5}>
                        <span>เกรด :</span><Form.Field readOnly control={Input} value={info.profile_registrant.edu_gpax} />
                      </Grid.Column>
                    </Grid.Row>

                  </Grid>
                </InfoSeg>
              </Grid.Row>
              <Grid.Row>
                <InfoSeg padded>
                  <Grid>
                    <Grid.Row>
                      <Icon name={'free code camp'} />
                      <SecHeader>ข้อมูลค่าย</SecHeader>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column centered='true'>
                        <Form>
                          <Form.Group>
                            <Form.Field width={5} control={TextArea} label='ค่ายที่เคยเข้าร่วม' value={info.profile_registrant.past_camp} />
                            <Form.Field width={5} control={TextArea} label='ทักษะคอมฯ' value={info.profile_registrant.skill_computer} />
                            <Form.Field width={6} control={TextArea} label='อยากบอกพี่ว่า' value={info.profile_registrant.tell_wipper} />
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
}

export default Tab1
