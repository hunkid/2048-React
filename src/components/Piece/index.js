import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {cellSize, cellMargin} from '../../constants/Size'
const ReactCssTransitionGroup = require('react-addons-css-transition-group')

class Piece  extends Component {
  static defaultProps = {
    pieceSize: cellSize,
    number: 2,
    styleClassName: 'sty',
    pos: [0, 0],
    isAnimationNeed: false
  }
  constructor (props) {
    super(props)
  }
  componentWillMount () {
  }
  componentWillUnmount () {
  }
  render () {
    let {styleClassName, number, pieceSize} = this.props
    let top = this.props.pos[0] * (cellMargin + pieceSize) + cellMargin + 'px'
    let left = this.props.pos[1] * (cellMargin + pieceSize) + cellMargin + 'px'
    let style = {left, top}
    if (this.props.isAnimationNeed){
      return (
        <ReactCssTransitionGroup
          transitionName="pieceAn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={10}
          transitionAppear={true}
          transitionAppearTimeout={400}>
          <div className={`piece ${styleClassName}-${number}`}
            style={style}
            onClick={this._test}>{number}
          </div>
        </ReactCssTransitionGroup>)
    } else {
      return (
        <div className={`piece ${styleClassName}-${number}`}
          style={style}
          onClick={this._test}>{number}
        </div>
      )
    }
    
  }
}
Piece.propTypes = {
  pieceSize: PropTypes.number,
  number: PropTypes.number,
  styleClassName: PropTypes.string,
  pos: PropTypes.arrayOf(PropTypes.number).isRequired,
  isAnimationNeed: PropTypes.bool
}

export default Piece
