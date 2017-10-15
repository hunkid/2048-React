import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {cellSize, cellMargin} from '../../constants/Size'

class Piece  extends Component {
  static defaultProps = {
    pieceSize: cellSize,
    number: 2,
    styleClassName: 'sty',
    pos: [0, 0]
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
    return <div className={`piece ${styleClassName}-${number}`}
            style={style}
            onClick={this._test}>{number}
           </div>
  }
}
Piece.propTypes = {
  pieceSize: PropTypes.number,
  number: PropTypes.number,
  styleClassName: PropTypes.string,
  pos: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default Piece
