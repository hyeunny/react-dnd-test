import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';

const knightSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Knight extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <span style={{
        opacity: isDragging ? 0.3 : 1,
        fontSize: 50,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </span>
    );
  }
}

Knight.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);