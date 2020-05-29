import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

export class TweetPage extends Component {
  displayParentTweet = (parentId) => {
    if (parentId !== this.props.id) {
      this.props.history.push(`/tweet/${parentId}`)
    } else {
      this.props.history.go()
    }
  }
  render() {
    const { id, replies } = this.props

    return (
      <div>
        <Tweet id={id} displayParentTweet={this.displayParentTweet} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet
                id={replyId}
                displayParentTweet={this.displayParentTweet}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUsers, users, tweets }, props) => {
  const { id } = props.match.params
  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort(
          (a, b) => tweets[b].timestamp - tweets[a].timestamp
        ),
  }
}

export default connect(mapStateToProps)(TweetPage)
