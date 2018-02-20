import React from 'react'
import {Card, Image} from 'semantic-ui-react'

const ItimCard = ({fullName, src, name, join, school}) => (
  <div>
    <Card>
      <Image centered fluid src={src} />
      <Card.Content>
        <Card.Header>
          <div className='text-center'>
            <h1>{fullName}</h1>
          </div>
        </Card.Header>
        <Card.Meta>
          <div className='text-center'>
            <h1>{name}</h1>
          </div>
        </Card.Meta>
        <Card.Description>
          {school}
        </Card.Description>
      </Card.Content>
    </Card>
  </div>
)

export default ItimCard
