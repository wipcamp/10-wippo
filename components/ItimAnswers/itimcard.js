import React from 'react'
import styled from 'styled-components'
import {Card} from 'semantic-ui-react'

const Text = styled.h1`
  font-family: 'Prompt', sans-serif;
`

const UserHeader = Text.extend`
  margin: 0;
`

const ItimCard = ({id, fullName, name, facebook}) => (
  <div>
    <Card>
      <Card.Content>
        <Card.Header>
          <div className='text-center'>
            <UserHeader>{`WIP ID : ${id}`}</UserHeader>
            <UserHeader>{`น้อง ${name}`}</UserHeader>
          </div>
        </Card.Header>
      </Card.Content>
    </Card>
  </div>
)

export default ItimCard
