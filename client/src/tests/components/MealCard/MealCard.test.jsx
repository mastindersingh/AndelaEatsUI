import React from 'react';
import { shallow } from 'enzyme';
import MealCard from '../../../components/MealCard/MealCard';

let props = {
  url: "/orders",
  id: '0023',
  meal: {
     mealItems: [
    { image: "image1", name: "Meal1"},
    { image: "image1", name: "Meal1"},
    { image: "image1", name: "Meal1"}
    ],
    orderStatus: "cancelled"
  },
  actions: {
    handleDelete: jest.fn(),
    handleRate: jest.fn()
  }
};

const getComponent = () => shallow(<MealCard {...props} />);

/*
global jest
expect
*/
describe('MealCard Component', () => {
  it('should render at least once', () => {
    const wrapper = getComponent();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should render CollectedAction', () => {
    expect(getComponent().find('CollectedAction').length).toBe(1);
    expect(getComponent().find('NotCollectedAction').length).toBe(0);
  });

  it('should render NotCollectedAction', () => {
    const { meal } = props;
    props = {
      ...props,
      meal: {
        ...meal, orderStatus: "booked"
      }
    };
    expect(getComponent().find('NotCollectedAction').length).toBe(1);
    expect(getComponent().find('CollectedAction').length).toBe(0);
  });
});
