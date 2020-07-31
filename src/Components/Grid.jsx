import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ gridArray }) => {
  console.log({ gridArray });
  return <div>GridArray</div>;
};

Grid.propTypes = {
  gridArray: PropTypes.array.isRequired,
};
export default Grid;
