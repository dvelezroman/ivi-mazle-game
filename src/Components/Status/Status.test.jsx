import React from 'react';
import { render, shallow, mount } from 'enzyme';
import Status from '../../Components/Status/Status.jsx';

const gameStatus = {
  status: '',
  message: '',
};

let wrapper = shallow(<Status gameStatus={gameStatus} />);

beforeEach(() => {
  wrapper = shallow(<Status gameStatus={gameStatus} />);
});

describe('Game suite', () => {
  test('Should render Status Component', () => {
    // const wrapper = shallow(<Status gameStatus={gameStatus} />);
    expect(wrapper.props()).toEqual({
      className: 'statusContainer',
      children: '',
    });
  });
  test('Should render a Message for Winning and a success className is present', () => {
    gameStatus.status = 'won';
    gameStatus.message = 'You won!';
    wrapper = shallow(<Status gameStatus={gameStatus} />);
    expect(wrapper.props()).toEqual({
      className: 'statusContainer success',
      children: 'You won!',
    });
  });
  test('Should render a Message for Losing and a fail className', () => {
    gameStatus.status = 'lost';
    gameStatus.message = 'You lost!';
    wrapper = shallow(<Status gameStatus={gameStatus} />);
    expect(wrapper.props()).toEqual({
      className: 'statusContainer fail',
      children: 'You lost!',
    });
  });
});
