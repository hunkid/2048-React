import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Score from '../../components/Score'

class ScoreContainer extends Component {
  static defaultProps = {
    scoreState: {
      score: 0
    }
  }
  render () {
    return <Score score={this.props.scoreState.score}/>
  }
}

ScoreContainer.propTypes = {
  scoreState: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    scoreState: state.score
  }
}

export default connect(mapStateToProps)(ScoreContainer)
