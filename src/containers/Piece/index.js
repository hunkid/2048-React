import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Piece from '../../components/Piece'

class PieceContainer extends Component {
  static defaultProps = {
    number: 2,
    styleClassName: 'sty',
    pos: [0, 0]
  }
  constructor (props) {
    super(props)
    this.state = {
      pos: [0, 0]
    }
  }
  test () {
    this.setState({
      pos: [2, 0]
    })
  }

  render () {
    let props = {...this.props, pos: this.state.pos}
    return (
      <div onClick={this.test.bind(this)}>
        <Piece {...props}/>
      </div>
    )
  }
}
PieceContainer.props = {
  pieceSize: PropTypes.number,
  number: PropTypes.number,
  styleClassName: PropTypes.string,
  pos: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default PieceContainer
