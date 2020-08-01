import React from 'react';
import Grid from '../Components/Grid';
import { useGameLogic } from '../business/useGameLogic';
import './Game.scss';
import PanelControl from '../Components/PanelControl';

const Game = () => {
  const { steps, gridArray, gridPosition, doResetMatrix } = useGameLogic({
    rows: 10,
    cols: 10,
  });
  return (
    <>
      <div className="game-container">
        <Grid gridArray={gridArray} gridPosition={gridPosition} />
      </div>
      <div>
        <PanelControl doResetMatrix={doResetMatrix} steps={steps} />
      </div>
    </>
  );
};

export default Game;
