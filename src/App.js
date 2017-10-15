import React, {Component} from 'react'
// import PropTypes from 'prop-types'

import Chess from './containers/Chess'
import Score from './containers/Score'

class  App extends Component {
  render () {
    return (
      <div>
        <div className="score-ot clearfix">
          <div className="f-r">
            <Score/>
          </div>
        </div>
        <Chess />
      </div>
    )
  }
}

export default App
