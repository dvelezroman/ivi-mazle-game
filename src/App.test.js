import React from 'react';
import { render, shallow, mount } from 'enzyme';
import App from './App';

describe('Main Test Suite', () => {
  test('Renders App', () => {
    const wrapper = shallow(<App />);
    const divApp = wrapper.getElement('.App');
    expect(divApp.props.className).toEqual('App');
  });
});
