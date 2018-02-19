import React from 'react'
import {Card, Image} from 'semantic-ui-react'

const ItimCard = ({src, name, join, school}) => (
  <div>
    <Card>
      <Image size='small' fluid src={src} />
      <Card.Content>
        <Card.Header>
          {name}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {new Date(join).toLocaleDateString()}
          </span>
        </Card.Meta>
        <Card.Description>
          {school}
        </Card.Description>
      </Card.Content>
    </Card>
  </div>
)

export default ItimCard
