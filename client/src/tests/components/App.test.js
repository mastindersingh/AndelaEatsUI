import React from 'react';
import { shallow } from 'enzyme';
import App, { NotFound } from '../../components/App';

/* 
global jest 
expect 
*/

test('should render Header correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

test('NotFound renders correctly', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});