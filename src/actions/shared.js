import { getInitialData } from '../utils/api'
import { receiveTweetsFromAPI } from './tweets'
import { receiveUsersFromAPI } from './users'
import { setAuthedUserFromAPI } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

export const handleInitialData = () => (dispatch) => {
  dispatch(showLoading())
  return getInitialData().then(({ users, tweets }) => {
    dispatch(receiveUsersFromAPI(users))
    dispatch(receiveTweetsFromAPI(tweets))
    dispatch(setAuthedUserFromAPI(AUTHED_ID))
    dispatch(hideLoading())
  })
}
