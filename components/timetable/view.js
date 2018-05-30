import React from 'react'

/*
====Style===
1
ITIM
#ff9f43
2
VICHAKARN
#0abde3
3
SWATDIKARN
#10ac84
4
LOCATION
#f368e0
5
MC
6
WIPPER
#feca57
7
CENTRAL
#f368e0
8
NAVIGATOR
#222f3e
9
NURSE
#ff6b6b
10
PHOTO
#576574
else
#c8d6e5
*/

export const getRoleTeamStyle = (event, start, end, isSelected) => {
  let roleColor = (role) => {
    switch (role) {
      case 1:
        return '#ff9f43'
      case 2:
        return '#0abde3'
      case 3:
        return '#10ac84'
      case 4:
        return '#f368e0'
      case 5:
        return '#c8d6e5'
      case 6:
        return '#feca57'
      case 7:
        return '#f368e0'
      case 8:
        return '#8395a7'
      case 9:
        return '#ff6b6b'
      case 10:
        return '#576574'
      default:
        return '#c8d6e5'
    }
  }
  let style = {
    backgroundColor: roleColor(event.role_team_id),
    opacity: 0.8,
    color: 'black',
    border: '0px',
    borderRadius: '3px'
  }
  return {style: style}
}

export const DateEvent = ({event}) => (
  <div>
    {event.eventName}
  </div>
)

export const CampRole = ({select, onChange}) => (
  <select className='form-control' defaultValue={select} onChange={onChange}>
    <option value='1'>ITIM</option>
    <option value='2'>VICHAKARN</option>
    <option value='3'>SWATDIKARN</option>
    <option value='4'>LOCATION</option>
    <option value='5'>MC</option>
    <option value='6'>WIPPER</option>
    <option value='7'>CENTRAL</option>
    <option value='8'>NAVIGATOR</option>
    <option value='9'>NURSE</option>
    <option value='10'>PHOTO</option>
  </select>
)
