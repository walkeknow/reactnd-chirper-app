import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

export class NewTweet extends Component {
  state = {
    text: '',
    toHome: false,
  }
  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text,
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    this.setState((currState) => {
      const { dispatch, id } = this.props

      dispatch(handleAddTweet(currState.text, id))
      return {
        text: '',
        toHome: id ? false : true,
      }
    })
  }
  render() {
    const { text, toHome } = this.state
    const charLeft = 280 - text

    if (toHome === true) {
      return <Redirect to='/'></Redirect>
    }

    return (
      <div>
        <div>
          <h3 className='center'>Compose New Tweet</h3>
          <form className='new-tweet' onSubmit={this.handleSubmit}>
            <textarea
              placeholder="What's happening?"
              value={text}
              onChange={this.handleChange}
              className='textarea'
              maxLength='280'
            />
            {charLeft <= 100 && <div className='tweet-length'>{charLeft}</div>}
            <button className='btn' type='submit' disabled={text.length === 0}>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(NewTweet)
