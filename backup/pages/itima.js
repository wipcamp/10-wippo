import React from 'react'
import styled from 'styled-components'
import axios from '../components/util/axios'
import cookie from '../components/util/cookie'

export default class Itima extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [{evals_answer: {
        evals: [{score: 0}]
      }}]
    }
  }

  async componentDidMount () {
    let { token } = await cookie({ req: false })
    let {data} = await axios.get(`/itima/evals`, {
      Authorization: `Bearer ${token}`
    })
    let dataArr = []
    await Object.keys(data).map((val, key) => {
      dataArr.push(data[val])
    })
    this.setState({data: dataArr})
    console.log(this.state.data)
  }

  render () {
    const Header = styled.span`
    font-size:75px;
    `
    const Sub = styled.span`
    font-size:44px;
    `
    return (
      <div style={{margin: '33px'}} className='container'>
        <span><Header>ItimA</Header><Sub>nalysis</Sub></span>
        <table style={{marginTop: '20px'}} className='table table-striped'>
          <thead>
            <tr>
              <td>
                WIP ID
              </td>
              <td>
                Question1
              </td>
              <td>
                Question2
              </td>
              <td>
               Question3
              </td>
              <td>
                Question4
              </td>
              <td>
               Question5
              </td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(itim => (
                <tr>
                  <td>
                    {itim.user_id}
                  </td>
                 
                </tr>
              ))
            }
          </tbody>
        </table>
        <div style={{width: '199px', margin: '2px'}} className='bg-light fixed-bottom'>save table? <button className='btn btn-success'>Save!</button></div>
      </div>
    )
  }
}
