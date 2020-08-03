import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from '@testing-library/react-hooks';
import Game from './Game.jsx';
import Grid from '../../Components/Grid/Grid.jsx';
import PanelControl from '../../Components/PanelControl/PanelControl.jsx';
import Status from '../../Components/Status/Status.jsx';
import { useGameLogic } from '../../business/useGameLogic.js';
import { getRandomMovement } from '../../App.test';

describe('Game suite', () => {
  test('Should render Status Component', () => {
    const wrapper = shallow(<Game />);
    const statusComponent = wrapper.find(Status);
    expect(statusComponent.length).toEqual(1);
  });
  test('Should render Grid Component', () => {
    const wrapper = shallow(<Game />);
    const gridComponent = wrapper.find(Grid);
    expect(gridComponent.length).toEqual(1);
  });
  test('Should render Panel Control Component', () => {
    const wrapper = shallow(<Game />);
    const panelComponent = wrapper.find(PanelControl);
    expect(panelComponent.length).toEqual(1);
  });
});

describe('Game suite test panel control', () => {
  let gameAppRendered;

  beforeEach(() => {
    gameAppRendered = mount(<Game />);
  });

  test('There are three buttons to control game', () => {
    const buttons = gameAppRendered.find('button');
    expect(buttons.length).toEqual(3);
  });

  test('Click on Start Game Button, disables button.', () => {
    gameAppRendered.find('#start').simulate('click');
    expect(gameAppRendered.find('#start').prop('disabled')).toEqual(true);
  });

  test('Timer has a prop timer to render', async () => {
    const timerDiv = gameAppRendered.find('#timer');
    expect(timerDiv.prop('children')).toEqual(['Timer: ', 0]);
  });

  test('Steps has a prop step to render', async () => {
    const timerDiv = gameAppRendered.find('#steps');
    expect(timerDiv.prop('children')).toEqual(['Steps: ', 16]);
  });
});

const waitAsync = (time) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), time);
  });

describe('Testing hook with components', () => {
  let setupComponent;
  let hook;

  beforeEach(() => {
    setupComponent = mountReactHook(useGameLogic, { rows: 10, cols: 10 });
    hook = setupComponent.componentHook;
  });
  test('mount hook within component', () => {
    expect(hook.steps).toEqual(16);
  });
  test('start the game and timer runs 3 seconds', async () => {
    await act(async () => {
      hook.doStartTimer();
    });
    expect(hook.playing).toEqual(true);
    await waitAsync(4000);
    expect(hook.timer).toBe(3);
  });
});

const mountReactHook = (hook, props) => {
  const Component = ({ children }) => children(hook(props));
  const componentHook = {};
  let componentMount;

  act(() => {
    componentMount = shallow(
      <Component>
        {(hookValues) => {
          Object.assign(componentHook, hookValues);
          return null;
        }}
      </Component>
    );
  });
  return { componentMount, componentHook };
};
