import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import './Grid.scss';

const Grid = ({ gridArray, gridPosition }) => (
  <div className="grid-container">
    {gridArray.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((column, colIndex) => {
          const here =
            rowIndex === gridPosition[0] && colIndex === gridPosition[1];

          return (
            <div key={colIndex}>
              <Square value={column} here={here} />
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
};
export default Grid;
