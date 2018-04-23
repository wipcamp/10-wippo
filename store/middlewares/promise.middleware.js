export default () => next => (action) => {
  if (!action.promise) {
    return next(action)
  }
  next({
    ...action,
    type: action.type.PENDING
  })
  const actionPromise = new Promise((resolve, reject) =>
    action.promise
      .then(response => {
        return resolve(
          next({ ...action, type: action.type.RESOLVED, ...response })
        )
      })
      .catch(error => {
        if (error.status === 404 || (error.data && error.data.error === 'LDAP Error. Invalid Credentials')) {
          return reject(
            next({ ...action, type: action.type.REJECTED, error: error.data })
          )
        }
        return resolve(
          next({ ...action, type: action.type.REJECTED, error: error.data })
        )
      })
  )
  return actionPromise
}
