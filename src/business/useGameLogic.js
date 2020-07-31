import { useState, useEffect, useCallback } from 'react';

const dims = [10, 10];
const KEYS = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
};

export const useGameLogic = () => {
  const [gridPosition, setGridPosition] = useState([1, 0]);
  const [gridArray, setGridArray] = useState([]);

  const doCreateMatrix = useCallback(() => {
    const matrix = [];
    for (let i = 0; i < dims[0]; i++) {
      matrix.push(Array.from(Array(dims[1]), () => Math.round(Math.random())));
    }
    return matrix;
  }, []);

  const doMovePosition = useCallback(
    (move) => {
      console.log(move);
      setGridPosition([0, 0]);
    },
    [setGridPosition]
  );

  useEffect(() => {
    setGridArray(doCreateMatrix());
  }, [doCreateMatrix]);

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      console.log(KEYS[e.keyCode]);
    });
  }, []);

  return {
    gridArray,
    gridPosition,
    doMovePosition,
  };
};
