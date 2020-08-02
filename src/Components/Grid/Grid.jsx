import React from 'react';
import PropTypes from 'prop-types';
import Square from '../Square/Square';
import './Grid.scss';

const Grid = ({ gridArray, gridPosition, homePosition }) => (
  <div className="grid-container">
    {gridArray.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((column, colIndex) => {
          const here =
            rowIndex === gridPosition[0] && colIndex === gridPosition[1];
          const home =
            rowIndex === homePosition[0] && colIndex === homePosition[1];

          return (
            <div key={colIndex}>
              <Square value={column} here={here} home={home} />
            </div>
          );
        })}
      </div>
    ))}
  </div>
);

Grid.propTypes = {
  gridArray: PropTypes.array.isRequired,
  gridPosition: PropTypes.array.isRequired,
  homePosition: PropTypes.array.isRequired,
};
export default Grid;
