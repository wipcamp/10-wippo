import React from 'react'
import CheckAnswerChart from './CheckAnswerChart'
import styled from 'styled-components'

const Card = styled.div`
 box-shadow : 0px 5px 15px 3px rgba(81,77,92,0.09);
`
const NumWrapper = styled.div`
  background: #62BAE0;
  color: white;
`
const TextInNumWrapper = styled.p`
  font-size: 2em;
  padding-top:10px;
  padding-bottom:10px;
`
const Num = styled.span`
  font-size: 1.7em;
  font-weight:600;
`
const ProgressBox = styled.div`
  padding-top:10px;
  padding-bottom:10px;
`
class Main extends React.Component {
  state = {
    now: ''
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='text-center my-4'>WIP Camp #10 Evaluation</h1>
          </div>
          <div className='col-8'>
            <CheckAnswerChart />
          </div>
          <div className='col-4'>
            
          </div>
        </div>
        <div className='row mt-3'>
          <Card className='col-3 mx-5 my-4'>
            <div className='row'>
              <NumWrapper className='col-4 my-auto'>
                <TextInNumWrapper className='text-center'>ข้อที่<br /><Num>1</Num></TextInNumWrapper>
              </NumWrapper>
              <ProgressBox className='col my-auto'>
                <h1 className='text-center'>ตรวจแล้ว<br />1/384</h1>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-danger' role='progressbar' style={{width:'15%'}}>15%</div>
                </div>
              </ProgressBox>
            </div>
          </Card>
          <Card className='col-3 mx-5 my-4'>
            <div className='row'>
              <NumWrapper className='col-4 my-auto'>
                <TextInNumWrapper className='text-center'>ข้อที่<br /><Num>2</Num></TextInNumWrapper>
              </NumWrapper>
              <ProgressBox className='col my-auto'>
                <h1 className='text-center'>ตรวจแล้ว<br />231/384</h1>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' style={{width:'70%'}}>70%</div>
                </div>
              </ProgressBox>
            </div>
          </Card>
          <Card className='col-3 mx-5 my-4'>
            <div className='row'>
              <NumWrapper className='col-4 my-auto'>
                <TextInNumWrapper className='text-center'>ข้อที่<br /><Num>3</Num></TextInNumWrapper>
              </NumWrapper>
              <ProgressBox className='col my-auto'>
                <h1 className='text-center'>ตรวจแล้ว<br />50/384</h1>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-warning' role='progressbar' style={{width:'45%'}}>45%</div>
                </div>
              </ProgressBox>
            </div>
          </Card>
          <Card className='col-3 mx-5 my-4'>
            <div className='row'>
              <NumWrapper className='col-4 my-auto'>
                <TextInNumWrapper className='text-center'>ข้อที่<br /><Num>4</Num></TextInNumWrapper>
              </NumWrapper>
              <ProgressBox className='col my-auto'>
                <h1 className='text-center'>ตรวจแล้ว<br />5/384</h1>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-danger' role='progressbar' style={{width:'2%'}}>2%</div>
                </div>
              </ProgressBox>
            </div>
          </Card>
          <Card className='col-3 mx-5 my-4'>
            <div className='row'>
              <NumWrapper className='col-4 my-auto'>
                <TextInNumWrapper className='text-center'>ข้อที่<br /><Num>5</Num></TextInNumWrapper>
              </NumWrapper>
              <ProgressBox className='col my-auto'>
                <h1 className='text-center'>ตรวจแล้ว<br />384/384</h1>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-success' role='progressbar' style={{width:'100%'}}>100%</div>
                </div>
              </ProgressBox>
            </div>
          </Card>
          <Card className='col-3 mx-5 my-4'>
            <div className='row'>
              <NumWrapper className='col-4 my-auto'>
                <TextInNumWrapper className='text-center'>ข้อที่<br /><Num>6</Num></TextInNumWrapper>
              </NumWrapper>
              <ProgressBox className='col my-auto'>
                <h1 className='text-center'>ตรวจแล้ว<br />170/384</h1>
                <div className='progress'>
                  <div className='progress-bar progress-bar-striped progress-bar-animated bg-info' role='progressbar' style={{width:'50%'}}>50%</div>
                </div>
              </ProgressBox>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Main
