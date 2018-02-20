import React from 'react'
import {Card, Image} from 'semantic-ui-react'

const ItimCard = ({src, name, join, school}) => (
  <div>
    <Card>
      <Image centered fluid src={src} />
      <Card.Content>
        <Card.Header>
          <div className='text-center'>
            {name}
          </div>
        </Card.Header>
        <Card.Meta>
          <div className='date text-center'>
            {`Joined Date: ${new Date(join).toLocaleDateString()}`}
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
