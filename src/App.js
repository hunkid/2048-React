import React, {Component} from 'react'
// import PropTypes from 'prop-types'

import Chess from './containers/Chess'
import Score from './containers/Score'

class  App extends Component {
  constructor (props) {
    super(props)
    this._handleGameOver = this._handleGameOver.bind(this)
  }
  _handleGameOver () {
    setTimeout(function(){alert('游戏已经结束')}, 500)
  }
  render () {
    return (
      <div>
        <div className="score-ot clearfix">
          <div className="f-r">
            <Score />
          </div>
        </div>
        <Chess gameOverFunc={this._handleGameOver}/>
      </div>
    )
  }
}

export default App
