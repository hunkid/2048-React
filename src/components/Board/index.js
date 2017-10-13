import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {cellSize, cellMargin} from '../../constants/Size'

class Board  extends Component {
  static defaultProps = {
    pieceNumPerCol: 4,
    cellSize,
    cellMargin
  }
  constructor(props) {
    super(props)
    this._generateBoardCell = this._generateBoardCell.bind(this)
    this._computeBoardSize = this._computeBoardSize.bind(this)
    this.state = {
      pos: [0,0]
    }
  }
  _generateBoardCell () {
    let m = []
    let num =  this.props.pieceNumPerCol * this.props.pieceNumPerCol
    for (let i = 0; i < num; i++) {
      m.push(1)
    }
    return m
  }
  _computeBoardSize () {
    let {cellSize, cellMargin, pieceNumPerCol} = this.props
    let width = (cellSize + cellMargin) * pieceNumPerCol + cellMargin
    let style = {
      width: `${width}px`
    }
    return style
  }
  render () {
    var cells = this._generateBoardCell()
    var style = this._computeBoardSize()
    return (
      <div className="board-outside">
        <div className="board-wp" style={style}>
          <ul className="piece-board clearfix">
            {cells.map((cell, i) => 
              <li key={i} className="cell"></li>
            )}
          </ul>
          {this.props.children}
        </div>
      </div>
    )
  }
}
Board.PropTypes = {
  pieceNumPerCol: PropTypes.number,
  cellSize: PropTypes.number,
  cellMargin: PropTypes.number
}

export default Board
