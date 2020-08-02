import { useState, useEffect, useCallback, useRef } from 'react';

const KEYS = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
};

export const useGameLogic = ({ rows, cols }) => {
  const timerListener = useRef();
  const [gridPosition, setGridPosition] = useState([0, 0]);
  const [homePosition, setHomePosition] = useState([9, 9]);
  const [steps, setSteps] = useState(16);
  const [timer, setTimer] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gridArray, setGridArray] = useState([]);
  const [gameStatus, setGameStatus] = useState({ status: '', message: '' });

  const doStartTimer = useCallback(() => {
    setGameStatus({ status: 'playing', message: `Timer is running...` });
    setPlaying(true);
    timerListener.current = setInterval(() => {
      setTimer((state) => state + 1);
    }, 1000);
  }, [setTimer, setPlaying]);

  const doStopTimer = useCallback(() => {
    clearInterval(timerListener.current);
    setPlaying(false);
  }, [setPlaying]);

  const doResetTimer = useCallback(() => {
    setTimer(0);
    setPlaying(false);
  }, [setTimer, setPlaying]);

  const doCreateMatrix = useCallback(
    (initialGridPosition) => {
      const matrix = [];
      for (let i = 0; i < rows; i++) {
        matrix.push(
          Array.from(Array(cols), () => (Math.random() * 10 > 9 ? 1 : 0))
        );
      }
      matrix[initialGridPosition[0]][initialGridPosition[1]] = 0;
      return matrix;
    },
    [cols, rows]
  );

  const doResetMatrix = useCallback(() => {
    const newMatrix = doCreateMatrix([0, 0]);
    setGridArray(newMatrix);
    setSteps(16);
    doStopTimer();
    setGridPosition([0, 0]);
  }, [doCreateMatrix, doStopTimer]);

  const doResetSteps = useCallback(() => {
    setSteps(16);
    doStopTimer();
    setTimer(0);
    setGridPosition([0, 0]);
    setGameStatus({ status: 'playing', message: 'Trying again...' });
  }, [doStopTimer]);

  const isPosibleToMove = useCallback(
    (direction) => {
      const nextPosition = [...gridPosition];
      switch (direction) {
        case 'LEFT':
          nextPosition[0] -= 1;
          break;
        case 'RIGHT':
          nextPosition[0] += 1;
          break;
        case 'UP':
          nextPosition[1] -= 1;
          break;
        case 'DOWN':
          nextPosition[1] += 1;
          break;
      }
      const [nextCol, nextRow] = nextPosition;

      if (
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow < rows &&
        nextCol < cols &&
        gridArray.length &&
        !gridArray[nextCol][nextRow]
      ) {
        return nextPosition;
      }
      return null;
    },
    [gridArray, gridPosition, rows, cols]
  );

  const doMovePosition = useCallback(
    (e) => {
      e.stopPropagation();
      const direction = KEYS[e.keyCode];
      if (playing) {
        if (Object.values(KEYS).includes(direction)) {
          const nextPosition = isPosibleToMove(direction);
          if (steps) {
            if (nextPosition && steps > 0) {
              setSteps((state) => state - 1);
              setGridPosition([...nextPosition]);
              if (
                nextPosition[0] === rows - 1 &&
                nextPosition[1] === cols - 1
              ) {
                doStopTimer();
                setPlaying(false);
                setGameStatus({ status: 'won', message: `You won!` });
              }
            }
          } else {
            if (steps === 0) {
              doStopTimer();
              setPlaying(false);
              setGameStatus({ status: 'lost', message: `You lost!` });
            }
          }
        }
      }
    },
    [doStopTimer, isPosibleToMove, steps, rows, cols, playing]
  );

  useEffect(() => {
    window.addEventListener('keyup', doMovePosition);
    return function cleanup() {
      window.removeEventListener('keyup', doMovePosition);
      clearInterval(timerListener.current);
    };
  }, [doMovePosition]);

  useEffect(() => {
    const initialGridPosition = [
      Math.floor(Math.random() * rows),
      Math.floor(Math.random() * cols),
    ];
    // setGridPosition(initialGridPosition);
    setGridArray(doCreateMatrix(initialGridPosition));
  }, [rows, cols, setGridPosition, setGridArray, doCreateMatrix]);
  return {
    playing,
    steps,
    timer,
    gridArray,
    gridPosition,
    homePosition,
    gameStatus,
    doMovePosition,
    doResetMatrix,
    doResetSteps,
    doResetTimer,
    doStartTimer,
    doStopTimer,
  };
};
