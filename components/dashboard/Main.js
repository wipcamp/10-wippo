import React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout/layout'
import Phase1 from '../../components/dashboard/Phase1'
// import Phase2 from '../../components/dashboard/Phase2'
class Main extends React.Component {
  state={
    rule: null
  }
  componentDidMount = () => {
    this.setState({rule: window.localStorage.getItem('id')})
  }
  render () {
    return (
      <Layout subheadertext='Dashboard'>
        <div className='row'>
          {
            this.state.rule !== null ? (
              <div className='col-12'>
                <div className='alert alert-success d-flex align-items-center' role='alert'>
                  คุณมีสิทธิตรวจคำตอบ
                  <div className='ml-auto'>
                    <Link href='/checkanswer'><a><button className='btn btn-dark'>คลิก</button></a></Link>
                  </div>
                </div>
              </div>
            ) : (<div />)
          }
          
          <div className='col'>
            <Phase1 />
          </div>
        </div>
        {/* <div className='row'>
          <div className='col'>
            <Phase2 />
          </div>
        </div> */}
      </Layout>
    )
  }
}
export default Main
