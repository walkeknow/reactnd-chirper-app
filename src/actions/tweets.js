import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

const addTweet = (tweet) => ({
  type: ADD_TWEET,
  tweet,
})

export const handleAddTweet = (text, replyingTo) => (dispatch, getState) => {
  const { authedUser } = getState()

  dispatch(showLoading())

  return saveTweet({
    text,
    author: authedUser,
    replyingTo,
  })
    .then((tweet) => dispatch(addTweet(tweet)))
    .then(() => dispatch(hideLoading()))
}

export const receiveTweetsFromAPI = (tweets) => ({
  type: RECEIVE_TWEETS,
  tweets,
})

const toggleTweet = ({ id, authedUser, hasLiked }) => ({
  type: TOGGLE_TWEET,
  id,
  authedUser,
  hasLiked,
})

export const handleToggleTweet = (info) => (dispatch) => {
  dispatch(toggleTweet(info))

  return saveLikeToggle(info).catch((e) => {
    console.warn('Error in handleToggle')
    dispatch(toggleTweet(info))
    alert('There was an error in liking the tweet. Try again!')
  })
}
