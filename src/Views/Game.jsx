import React from 'react';
import Grid from '../Components/Grid';
import { useGameLogic } from '../business/useGameLogic';

const Game = () => {
  const { gridArray } = useGameLogic();
  return (
    <div>
      <Grid gridArray={gridArray} />
    </div>
  );
};

export default Game;
