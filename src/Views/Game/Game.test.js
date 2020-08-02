import React from 'react';
import { render, shallow, mount } from 'enzyme';
import Game from './Game.jsx';
import Grid from '../../Components/Grid/Grid.jsx';
import PanelControl from '../../Components/PanelControl/PanelControl.jsx';
import Status from '../../Components/Status/Status.jsx';

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
