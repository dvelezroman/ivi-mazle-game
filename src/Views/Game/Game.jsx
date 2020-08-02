import React from 'react';
import { useGameLogic } from '../../business/useGameLogic';
import './Game.scss';
import PanelControl from '../../Components/PanelControl/PanelControl';
import Status from '../../Components/Status/Status';
import Grid from '../../Components/Grid/Grid';

const Game = () => {
  const {
    playing,
    steps,
    timer,
    gridArray,
    gridPosition,
    homePosition,
    doResetMatrix,
    doResetSteps,
    doResetTimer,
    doStartTimer,
    doStopTimer,
    gameStatus,
  } = useGameLogic({
    rows: 10,
    cols: 10,
  });
  return (
    <>
      <div className="status">
        <Status gameStatus={gameStatus} />
      </div>
      <div className="game-container">
        <Grid
          gridArray={gridArray}
          gridPosition={gridPosition}
          homePosition={homePosition}
        />
      </div>
      <div>
        <PanelControl
          playing={playing}
          gameStatus={gameStatus}
          doResetMatrix={doResetMatrix}
          doResetSteps={doResetSteps}
          doResetTimer={doResetTimer}
          doStartTimer={doStartTimer}
          doStopTimer={doStopTimer}
          steps={steps}
          timer={timer}
        />
      </div>
    </>
  );
};

export default Game;
