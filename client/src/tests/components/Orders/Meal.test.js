import React from 'react';
import { shallow } from 'enzyme';
import Meal from '../../../components/Order/Meal';

const props = {
  onChange: () => jest.fn(),
  shouldHaveCheckBox: true,
  meal: {
    id: 1,
    courseType: "Main Meal",
    meal: "Rice",
    mealPicture: ''
  },
  menuLists: {
    menus: []
  }
};

let wrapper;
/* 
global jest 
expect 
*/
describe('Meal Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<Meal {...props} />);
    expect(wrapper).toBeDefined();
  });
  
  it('should call onChange on radio input', () => {
    const event = { target: { checked: true } };
    const onChangeSpy = jest.spyOn(props, 'onChange');
    wrapper = shallow(<Meal {...props} />);
    wrapper.find('.radio-custom').simulate('change', event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
