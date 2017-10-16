import React, {Component} from 'react'

import Chess from './containers/Chess'
import Score from './containers/Score'

import { store } from './store'
class  App extends Component {
  constructor (props) {
    super(props)
    this._handleGameOver = this._handleGameOver.bind(this)
  }
  _handleGameOver () {
    let score = store.getState().score.score
    setTimeout(function(){alert(`游戏已经结束\n您的得分是${score}`)}, 500)
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
