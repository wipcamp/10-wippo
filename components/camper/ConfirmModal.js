import React from 'react'
import styled from 'styled-components'
import { Button, Modal } from 'semantic-ui-react'

const CustomModal = styled(Modal)`
  max-height: 120px;
  font-family: 'Prompt';
`

const Header = styled(Modal.Header)`
  font-family: 'Prompt' !important;
`

const CustomButton = styled(Button)`
  font-family: 'Prompt' !important;
`

const ConfirmModal = ({handleFields, confirm, open, data, reload}) => (
  <CustomModal
    open={open}
    size='small'
  >
    <Header className='text-center'>
      ยืนยันที่จะเปลี่ยนรสให้น้อง
    </Header>
    <Modal.Actions>
      <CustomButton
        onClick={() => handleFields('open', false)}
        negative
      >
        ยกเลิก
      </CustomButton>
      <CustomButton
        onClick={() => {
          confirm(data.sectionId, data.userId)
          handleFields('open', false)
          reload()
        }}
        positive
        icon='checkmark'
        labelPosition='right'
        content='ยืนยัน'
      />
    </Modal.Actions>
  </CustomModal>
)

export default ConfirmModal
