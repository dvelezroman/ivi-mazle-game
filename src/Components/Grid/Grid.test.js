import React from 'react';
import { render, shallow, mount } from 'enzyme';
import Grid from './Grid';

const gridArray = [];
const gridPosition = [];
const homePosition = [];

let wrapper = shallow(
  <Grid
    gridArray={gridArray}
    gridPosition={gridPosition}
    homePosition={homePosition}
  />
);

describe('Grid suite', () => {
  test('Should render Grid Component', () => {
    const rows = wrapper.find('.row');
    expect(rows.length).toEqual(0);
    // expect(wrapper.props()).toEqual({
    //   className: 'statusContainer',
    //   children: '',
    // });
  });
});
