import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { shallow } from 'enzyme';
import App from './App';
import { useGameLogic } from './business/useGameLogic';

const getRandomMovement = () => {
  const min = 37;
  const max = 40;
  return Math.ceil(Math.random() * (max - min) + min);
};

describe('Main Test Suite', () => {
  test('Renders App', () => {
    const wrapper = shallow(<App />);
    const divApp = wrapper.getElement('.App');
    expect(divApp.props.className).toEqual('App');
  });
});

describe('Test useGameLogic Hook', () => {
  const props = { rows: 10, cols: 10 };
  test('hook runs correctly, initial values', () => {
    const { result } = renderHook(() => useGameLogic(props));
    expect(result.current.homePosition).toStrictEqual([9, 9]);
    expect(result.current.gridPosition).toStrictEqual([0, 0]);
    expect(result.current.gridArray.length).toEqual(10);
    expect(result.current.steps).toBe(16);
    expect(result.current.timer).toBe(0);
    expect(result.current.playing).toBe(false);
    expect(result.current.gameStatus).toEqual({ status: '', message: '' });
    expect(typeof result.current.doStartTimer).toBe('function');
    expect(typeof result.current.doMovePosition).toBe('function');
  });

  test('You cannot move because playing status is false', () => {
    const { result } = renderHook(() => useGameLogic(props));
    const mockEvent = {
      stopPropagation: jest.fn(),
      keyCode: 40,
    };
    expect(result.current.playing).toBe(false);
    act(() => result.current.doMovePosition(mockEvent));

    expect(result.current.gridPosition).toStrictEqual([0, 0]);
  });
  test('You can move down because playing status is true', () => {
    const { result } = renderHook(() => useGameLogic(props));
    const mockEvent = {
      stopPropagation: jest.fn(),
      keyCode: 40,
    };
    act(() => result.current.doStartTimer());
    expect(result.current.playing).toBe(true);
    let loops = 1;
    // this while loop goes until you can move once
    while (loops > 0) {
      const previousSetps = result.current.steps;
      const moveTo = getRandomMovement();
      mockEvent.keyCode = moveTo;
      act(() => result.current.doMovePosition(mockEvent));
      if (result.current.steps < previousSetps) {
        loops -= 1;
      }
    }
    expect(result.current.steps).toBe(15);
  });
  describe('You move 16 steps until you win or lose', () => {
    test('move the stes you nedd to finish the game.', () => {
      const { result } = renderHook(() => useGameLogic(props));
      act(() => result.current.doStartTimer());
      expect(result.current.playing).toBe(true);
      const mockEvent = {
        stopPropagation: jest.fn(),
      };
      let loops = 16;
      while (loops > 0) {
        const previousSetps = result.current.steps;
        const moveTo = getRandomMovement();
        mockEvent.keyCode = moveTo;
        act(() => result.current.doMovePosition(mockEvent));
        if (result.current.steps < previousSetps) {
          loops -= 1;
        }
      }
      expect(result.current.steps).toBe(0);
      // This movement sets the result of the game
      act(() => result.current.doMovePosition(mockEvent));
      expect(result.current.playing).toBe(false);
      if (
        result.current.gridPosition[0] === result.current.homePosition[0] &&
        result.current.gridPosition[1] === result.current.homePosition[1]
      ) {
        expect(result.current.gameStatus).toStrictEqual({
          status: 'won',
          message: 'You won!',
        });
      } else {
        expect(result.current.gameStatus).toStrictEqual({
          status: 'lost',
          message: 'You lost!',
        });
      }
    });
  });
});
