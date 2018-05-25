/* global localStorage */
import actionCreator from '../../libs/actionCreator'
import api from '../../components/util/axios.js'
import cookie from '../../components/util/cookie'
import { convertToInt, convertToFloat, dataIsNotNull } from '../../utils/helper'

const regisAction = actionCreator('register')

const SET_FIELD = regisAction('SET_FIELD')
const SAVE_REGISTER = regisAction('SAVE_REGISTER', true)
const SHOW_DIALOG = regisAction('SHOW_DIALOG')
const HIDE_DIALOG = regisAction('HIDE_DIALOG')
const INSERT_STAFF = regisAction('INSERT_STAFF', true)

let initialState = {
  loading: false,
  showDialog: false,
  error: false,
  dialogMessage: '',
  step: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return action.payload ? {
        ...state,
        dialogMessage: 'กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้องนะครับ',
        error: true,
        showDialog: true
      } : { ...state }

    case HIDE_DIALOG:
      return {
        ...state,
        showDialog: false
      }

    case SET_FIELD:
      return {
        ...state,
        [action.field]: action.value
      }

    case SAVE_REGISTER.PENDING:
      return {
        ...state,
        loading: true
      }

    case SAVE_REGISTER.RESOLVED:
      return {
        ...state,
        loading: false,
        step: state.step + 1
      }

    case SAVE_REGISTER.REJECTED:
      return {
        ...state,
        loading: false,
        dialogMessage: action.error,
        showDialog: true,
        error: true
      }

    case INSERT_STAFF.PENDING:
      return {
        ...state,
        loading: true
      }

    case INSERT_STAFF.RESOLVED:
      return {
        ...state,
        loading: false,
        step: state.step + 1,
        error: false,
        dialogMessage: 'success',
        showDialog: true
      }

    case INSERT_STAFF.REJECTED:
      return {
        ...state,
        loading: false,
        dialogMessage: action.error,
        showDialog: true,
        error: true
      }

    default: return state
  }
}

const prepareData = (form, fields) => {
  const data = {}
  fields.map(field => { data[field] = form[field] })
  return data
}

const getOnlyNum = (value) => value.replace(/[^\d]/g, '')

const fields = [
  'user_id',
  'first_name',
  'last_name',
  'first_name_en',
  'last_name_en',
  'nickname',
  'gender_id',
  'citizen_id',
  'religion_id',
  'birth_at',
  'blood_group',
  'congenital_diseases',
  'allergic_foods',
  'congenital_drugs',

  'addr_prov',
  'addr_dist',
  'telno_personal',

  'birth_at'
]

export const actions = {
  setField: (field, value) => ({
    type: SET_FIELD,
    field,
    value
  }),
  registerSubmit: (values) => async (dispatch) => {
    console.log('this is registerSubmit', values)
    const data = prepareData(values, fields)
    data.gender_id = convertToInt(data.gender_id)
    data.religion_id = convertToInt(data.religion_id)
    // data.edu_gpax = convertToFloat(data.edu_gpax)
    if (data.birth_at) {
      data.birth_at = data.birth_at.format('YYYY-MM-DD')
    }
    data.telno_personal = getOnlyNum(data.telno_personal)
    data.citizen_id = getOnlyNum(data.citizen_id)
    data.user_id = await JSON.parse(localStorage.getItem('user')).id

    data.edu_name = 'วิปแคมป์'
    data.edu_lv = 'มหาวิทยาลัย'
    data.edu_major = '-'
    data.edu_gpax = 0.00
    data.parent_relation = '-'
    data.telno_parent = '-'
    let { token } = cookie({req: false})
    if (dataIsNotNull(data)) {
      await localStorage.setItem('wip-staff', JSON.stringify({
        flavorId: values.flavorId,
        stdId: values.stdId
      }))

      dispatch({
        type: SAVE_REGISTER,
        promise: api.post('/profiles', data, {Authorization: `Bearer ${token}`})
      })
    } else {
      dispatch({
        type: SAVE_REGISTER.REJECTED
      })
    }
  },
  insertStaff: () => async (dispatch) => {
    const staff = await JSON.parse(localStorage.getItem('wip-staff'))
    let data = {
      ...staff
    }
    data.userId = await JSON.parse(localStorage.getItem('user')).id
    let { token } = cookie({req: false})
    dispatch({
      type: INSERT_STAFF,
      promise: api.post('/staffs', data, {Authorization: `Bearer ${token}`})
    })
  },
  onSubmitError: (err) => ({
    type: SHOW_DIALOG,
    payload: err
  }),
  hideDialog: () => ({
    type: HIDE_DIALOG
  })
}
