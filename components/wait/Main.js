import React from 'react'
import dynamic from 'next/dynamic'
import {Router} from '../../routes'
import styled from 'styled-components'
import {compose, withState} from 'recompose'
import api from '../util/axios'
import getCookie from '../util/cookie'
import {IndexTemplate, Wrapper} from '../layout/layout'

const SweetAlert = dynamic(import('sweetalert-react'), {
  ssr: false
})

const Input = styled.input`
  font-style: italic;
`
const Submit = styled.input`
  margin-right: 5px;
  margin-bottom: 15px;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 60px;
`
const Text = styled.h1`
  font-style: italic;
`

const checkStaff = (id, headers) => api.get(`/staffs/${id}`, headers)

const requestStaff = async (stdId, setStdId, setShow) => {
  let {token} = await getCookie({req: false})
  let headers = {
    Authorization: `Bearer ${token}`
  }
  let {data: { id }} = await api.post('/auth/me', null, headers)
  if (!id) {
    Router.pushRoute('/')
  }

  setShow(true)

  let {data: {data}} = await checkStaff(id, headers)
  if (!data) {
    await api.post('/staffs', {
      userId: id,
      stdId
    }, {
      Authorization: `Bearer ${token}`
    })
  }
  setStdId('')
}

const onEnter = (key, stdId, setStdId, setShow) => {
  if (key.which === 13 || key.keyCode === 13) {
    requestStaff(stdId)
    setShow(true)
    setStdId('')
  }
}

const Waiting = ({show, setShow, stdId, setStdId}) => (
  <IndexTemplate>
    <Wrapper className={`d-flex flex-column justify-content-center align-items-start`}>
      <Text>
        Request for Access System.
      </Text>
      <Input
        className={`mt-4 form-control`}
        type={`number`}
        value={stdId}
        placeholder={`Your Student ID ...`}
        onKeyPress={(key) => onEnter(key, stdId, setStdId, setShow)}
        onChange={({target}) => setStdId(target.value)}
      />
      <Submit
        className={`btn btn-primary btn-lg mt-3`}
        onClick={() => requestStaff(stdId, setStdId, setShow)}
        type={`submit`}
        value={`Request`}
      />
      <SweetAlert
        show={show}
        type='success'
        title='Success'
        text='Please contact Administrator for confirm your request.'
        onConfirm={() => setShow(false)}
      />
    </Wrapper>
  </IndexTemplate>
)

export default compose(
  withState('stdId', 'setStdId', ''),
  withState('show', 'setShow', false)
)(Waiting)
