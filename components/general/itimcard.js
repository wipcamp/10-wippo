import React from 'react'
import {Card, Image} from 'semantic-ui-react'

const ItimCard = props => (
  <div>
    <Card>
      <Image src={props.src} />
      <Card.Content>
        <Card.Header>
          {props.name}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {props.join}
          </span>
        </Card.Meta>
        <Card.Description>
          {props.school}
        </Card.Description>
      </Card.Content>
    </Card>
  </div>
)

export default ItimCard
