import React from 'react'
import styled from 'styled-components'
import { MinHeight } from './layout'

const ModalTemplate = styled.div`
  background-color: rgba(61,61,61,0.5);
  z-index: 999;
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;

  .card {
    width: 800px;
    margin: 0 auto;
    margin-top: 20em;
    h1 {
      color: #000;
    }
  }
  
  ${props => !props.show && 'display: none'}

`

const Modal = ({ show, message, children }) => (
  <ModalTemplate show={show}>
    <div className='animated fadeIn container-fluid'>
      { children ||
        <MinHeight className='row d-flex flex-column justify-content-center align-items-center'>
          <div className='col-12 text-center'>
            <div className='card col-12'>
              <div className='card-body text-center'>
                <h1>{message}</h1>
              </div>
            </div>
          </div>
        </MinHeight>
      }
    </div>
  </ModalTemplate>
)

export default Modal
