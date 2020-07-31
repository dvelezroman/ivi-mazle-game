import React from 'react';
import Grid from '../Components/Grid';
import { useGameLogic } from '../business/useGameLogic';
import './Game.scss';

const Game = () => {
  const { gridArray, gridPosition } = useGameLogic();
  return (
    <div className="game-container">
      <Grid gridArray={gridArray} gridPosition={gridPosition} />
    </div>
  );
};

export default Game;
