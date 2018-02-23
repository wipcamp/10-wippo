import React from 'react'
import styled from 'styled-components'
import {Card, Image, Button, Icon} from 'semantic-ui-react'

const Text = styled.h1`
  font-family: 'Kanit', sans-serif;
`
const Stats = styled.h3`
  font-family: 'Kanit', sans-serif;
`

const UserHeader = Text.extend`
  margin: 0;
`

const FullName = Text.extend`
  margin: 0;
  font-size: 1.5em;
  color: #d85000;
`

const ItimCard = ({id, fullName, src, name, question, facebook}) => (
  <div>
    <Card>
      <Image size={`medium`} centered src={src} />
      <Card.Content>
        <Card.Header>
          <div className='text-center'>
            <UserHeader>{id}</UserHeader>
            <UserHeader>{name}</UserHeader>
            <a href={`${facebook}`} target='_blank'><Button color='facebook' className='btn-block mt-2'>
              <Icon name='facebook' /> Facebook
            </Button></a>
          </div>
        </Card.Header>
        <Card.Meta>
          <div className='text-center'>
            <FullName>{fullName}</FullName>
          </div>
        </Card.Meta>
      </Card.Content>
      <Card.Content className='text-center'>
        <Stats>ตอบคำถาม <span className='text-danger'>{question}</span>/6 ข้อ</Stats>
      </Card.Content>
    </Card>
  </div>
)

export default ItimCard
