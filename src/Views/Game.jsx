import React from 'react';
import Grid from '../Components/Grid';
import { useGameLogic } from '../business/useGameLogic';
import './Game.scss';

const Game = () => {
  const { gridArray, gridPosition } = useGameLogic({ rows: 10, cols: 10 });
  return (
    <div className="game-container">
      <Grid gridArray={gridArray} gridPosition={gridPosition} />
    </div>
  );
};

export default Game;
