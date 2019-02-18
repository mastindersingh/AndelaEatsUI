import React from 'react';
import { shallow } from 'enzyme';
import MealOption from '../../../components/EditOrder/MealOptions';

const props = {
  name: "main",
  meal: {
    id: 2,
    courseType: "Main Meal",
    meal: "Wheat",
    mealPicture: "https://i.ytimg.com/vi/SkGBXn01bD8/maxresdefault.jpg"
  },
  selectedMealId: "Beans",
  handleOptionChange: jest.fn()
};
/* 
global jest 
expect 
*/
describe('MealOption Component', () => {
  const wrapper = shallow(<MealOption {...props} />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
