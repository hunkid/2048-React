import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './index.css'

class Score extends Component {
  static defaultProps = {
    score: 0
  }
  render () {
    return (
      <div className="score-panel">
        <div className="score-bd">
          SCORE
        </div>
        <div className="score-ft">
          {this.props.score}
        </div>
      </div>
    )
  }
}
Score.PropTypes = {
  score: PropTypes.number.isRequired
}

export default Score
