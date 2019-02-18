import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/MealCard/Modal'; //eslint-disable-line

const props = {
  displayModal: true,
  closeModal: jest.fn(),
  deleteOrder: jest.fn(),
  modalContent: {
    id: "123",
    mealItems: [
    { image: "image1", name: "Meal1"},
    { image: "image1", name: "Meal1"},
    { image: "image1", name: "Meal1"}
    ]
  }
};
/*
global jest
expect
*/
describe('Modal Component', () => {
  const wrapper = shallow(<Modal {...props} />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should open modal and delete order', () => {
    wrapper.find('.delete-order').simulate('click');
  });
});
