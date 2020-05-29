export const RECEIVE_USERS = 'RECEIVE_USERS'

export const receiveUsersFromAPI = (users) => ({
  type: RECEIVE_USERS,
  users,
})