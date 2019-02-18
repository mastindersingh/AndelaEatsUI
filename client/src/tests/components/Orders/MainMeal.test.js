import React from 'react';
import { shallow } from 'enzyme';
import MainMeal from '../../../components/Order/MainMeal';

const props = {
  onChange: () => jest.fn(),
  shouldHaveCheckBox: true,
  meal: {
    mainMeal: {
      id: 1,
      courseType: "Main Meal",
      meal: "Rice",
      mealPicture: ''
    }
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
describe('MainMeal Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<MainMeal {...props} />);
    expect(wrapper).toBeDefined();
  });
  
  it('should call onChange on radio input', () => {
    const event = { target: { checked: true } };
    const onChangeSpy = jest.spyOn(props, 'onChange');
    wrapper = shallow(<MainMeal {...props} />);
    wrapper.find('.radio-custom').simulate('change', event);
    expect(onChangeSpy).toHaveBeenCalled();
  });
});
