import React from 'react'
import styled from 'styled-components'

const DetailItem = styled.div`
  display: inline-block;
  background: rgba(112,201,255,0.5);
  padding: 5px 10px;
  margin: 5px;
  border: 2px solid #11a6ff;
`

const DetailAssignList = ({
  assignTo,
  roleteams,
  staffs
}) => (
  <div>
    <b>AssignTo</b>
    <div>
      { assignTo.length === 0
        ? 'ไม่มี'
        : assignTo.map((d, index) => (
          <div key={index} className='d-inline-block'>
            {d.assigned_id === null ? (
              <DetailAssignItem
                item={roleteams.find(t => d.role_team_id === t.id)}
                isTeam
              />
            ) : (
              <DetailAssignItem
                item={staffs.find(g => d.assigned_id === g.user_id)}
              />
            )}
          </div>
        ))
      }
    </div>
  </div>
)

const DetailAssignItem = ({
  isTeam,
  item
}) => {
  if (!item) return <div />
  return isTeam ? (
    <DetailItem className='rounded'>
      ทีม {item.description}
    </DetailItem>
  ) : (
    <DetailItem className='rounded'>
      {item.user_id}: {item.profile.first_name} {item.profile.last_name} ({item.profile.nickname})
    </DetailItem>
  )
}

export default DetailAssignList
