import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, shallow, mount } from 'enzyme';
import App from './App';
import { useGameLogic } from './business/useGameLogic';

describe('Main Test Suite', () => {
  test('Renders App', () => {
    const wrapper = shallow(<App />);
    const divApp = wrapper.getElement('.App');
    expect(divApp.props.className).toEqual('App');
  });
});

describe('Test useGameLogic Hook', () => {
  it('hook runs correctly', () => {
    const props = { rows: 10, cols: 10 };

    const { result } = renderHook(() => useGameLogic(props));
    console.log(result);
    expect(result.current.steps).toBe(16);
  });
});
