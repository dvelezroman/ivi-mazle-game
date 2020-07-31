import { useState, useEffect, useCallback } from 'react';

const KEYS = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
};

export const useGameLogic = ({ rows, cols }) => {
  const [gridPosition, setGridPosition] = useState([0, 0]);
  const [gridArray, setGridArray] = useState([]);

  const doCreateMatrix = useCallback(() => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix.push(Array.from(Array(cols), () => Math.round(Math.random())));
    }
    return matrix;
  }, []);

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
        gridArray.length &&
        !gridArray[nextCol][nextRow]
      ) {
        // console.log(`[${nextRow}, ${nextCol}]`);
        return nextPosition;
      }
      return null;
    },
    [gridArray, gridPosition]
  );

  const doMovePosition = useCallback(
    (e) => {
      e.stopPropagation();
      const direction = KEYS[e.keyCode];
      if (Object.values(KEYS).includes(direction)) {
        const nextPosition = isPosibleToMove(direction);
        if (nextPosition) {
          setGridPosition([...nextPosition]);
        }
      }
    },
    [setGridPosition, isPosibleToMove]
  );

  useEffect(() => {
    setGridArray(doCreateMatrix());
  }, [doCreateMatrix]);

  useEffect(() => {
    document.addEventListener('keyup', doMovePosition);
    return () => document.removeEventListener('keyup', doMovePosition);
  }, [doMovePosition, setGridPosition]);

  useEffect(() => {
    const initialGridPosition = [
      Math.floor(Math.random() * rows),
      Math.floor(Math.random() * cols),
    ];
    setGridPosition(initialGridPosition);
  }, [rows, cols, setGridPosition]);

  return {
    gridArray,
    gridPosition,
    doMovePosition,
  };
};
