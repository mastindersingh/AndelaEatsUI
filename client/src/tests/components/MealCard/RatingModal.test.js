import React from 'react';
import { shallow } from 'enzyme';
import RatingModal from '../../../components/MealCard/RatingModal';

const props = {
  displayModal: true,
  modalContent: {
    dateBookedFor: ''
  }
};
/*
global jest
expect
*/
describe('Modal Component', () => {
  const wrapper = shallow(<RatingModal {...props} />);

  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});