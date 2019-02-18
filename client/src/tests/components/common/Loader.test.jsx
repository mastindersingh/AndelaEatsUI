import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../../components/common/Loader/Loader';

/* 
global jest 
expect 
*/
describe('CollectedAction Component', () => {
  const wrapper = shallow(<Loader />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
