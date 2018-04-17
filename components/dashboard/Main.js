import React from 'react'
import Layout from '../../components/layout/layout'
// import Phase1 from '../../components/dashboard/Phase1'
// import Phase2 from '../../components/dashboard/Phase2'
import Phase3 from '../../components/dashboard/Phase3'
class Main extends React.Component {
  state={
    rule: []
  }
  componentDidMount = () => {
    if (window && window.localStorage.getItem('team')) {
      this.setState({
        rule: JSON.parse(window.localStorage.getItem('team')) || []
      })
    }
  }
  render () {
    return (
      <Layout subheadertext='Dashboard'>
        <div className='row'>
          {/*
          ********HARD CODE NOTIFICATION********
          */}
          {/* {
            this.state.rule.length > 0 ? (
              <div className='col-12'>
                <div className='alert alert-success d-flex align-items-center' role='alert'>

                  <div className='ml-auto'>
                    <Link href='/checkanswer'><a><button className='btn btn-dark'>คลิก</button></a></Link>
                  </div>
                </div>
              </div>
            ) : (<div />)
          } */}

          <div className='col'>
            <Phase3 />
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
