import React from 'react'
import ExaminationMain from './../components/exam/Main'

export default class Examination extends React.Component {
  // async componentDidMount () {
  //   document.getElementsByTagName('html')[0].addEventListener('contextmenu', (ev) => {
  //     ev.preventDefault()
  //     return false
  //   }, false)
  //   document.getElementsByTagName('html')[0].addEventListener('keydown', (ev) => {
  //     if (ev.keyCode !== 13 && ev.keyCode !== 8 && (ev.keyCode < 48 || ev.keyCode > 57) && (ev.keyCode > 105 || ev.keyCode < 96)) {
  //       ev.preventDefault()
  //       return false
  //     }
  //     return true
  //   }, false)
  // }

  render () {
    return <ExaminationMain />
  }
}
