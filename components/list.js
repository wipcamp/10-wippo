import React from 'react'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
const List = styled.li`
  display: block;
  margin: 0 auto;
  text-align: center;
  color: ${props => props.active ? '#bf2d46;' : '#525672;'};
  background-color : ${props => props.active ? '#282a3a' : ''};
  font-size: 1.7em;
  padding:0.6em 0.3em;
`
const ListText = styled.p`
  color: #fefefe;
  font-size: 0.5em;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
`
const MyList = props => (
  <List active={props.active}>
    <FontAwesomeIcon icon={props.icon} />
    <ListText>{props.text}</ListText>
  </List>
)

export default MyList
