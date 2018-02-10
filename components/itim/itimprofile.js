import React from 'react'
import Axios from 'axios'
import { Button } from 'semantic-ui-react'
import Link from 'next/link'

export default class ItimProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      camper: []
    }
  }
  componentWillMount = async () => {
    let {data} = await Axios.get(`http://localhost:8000/api/v1/profiles/${this.props.id}`)
    data = data.map(profile => {
      return {
        ...profile,
        fullname: `${profile.first_name} ${profile.last_name}`
      }
    })
    this.setState({
      camper: data[0]
    })
  }
  render () {
    return (
      <div>
        <p>Name : {this.state.camper.first_name} {this.state.camper.last_name}</p>
        <p>Nickname : {this.state.camper.nickname}</p>
        <p>Gender : {this.state.camper.gender === 1 ? (<span>male</span>) : (<span>female</span>)}</p>
        <Link href='/itim'><a><Button color='teal'>Back</Button></a></Link>
      </div>
    )
  }
}
