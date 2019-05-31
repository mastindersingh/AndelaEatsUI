import React from 'react';
import { shallow } from 'enzyme';
import MenuAndMeals from '../../../../components/Admin/Tabs/MenusAndMeals';

const wrapper = shallow(<MenuAndMeals />);

describe('MenuAndMeals Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a div', () => {
    const div = wrapper.find('div');
    expect(div.length).toEqual(4);
  });

});