import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const ModalContainer = styled.div`
  background-color: rgba(0,0,0,0.6);
  z-index: 1;
  ${({ show }) => show && `
    display: block;
  `}
`

const fade = keyframes`
  0% { top: 20%; }
  70% { top: 1%; }
  100% { top: 5%; }
`

const Dialog = styled.div`
  z-index: 30;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  animation: ${fade} .3s ease;

  ${props => props.show ? `
    display: block;
  ` : `
    display: none;
  `}
`

const Modal = ({ title, show, toggle, children }) => (
  <div>
    <ModalContainer className={`modal `} show={show}
      onClick={toggle}
    />
    <Dialog className='modal-dialog modal-lg' role='document'
      show={show}
      onKeyDown={e => { e.key === 'Escape' && toggle() }}
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h3 className='modal-title'>{title}</h3>
          <button type='button' className='close'
            onClick={toggle}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </Dialog>
  </div>
)

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default Modal
