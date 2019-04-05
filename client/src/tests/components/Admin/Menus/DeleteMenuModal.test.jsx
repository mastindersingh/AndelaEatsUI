/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import DeleteMenuModal
  from '../../../../components/Admin/Menus/DeleteMenuModal';

const props = {
  closeModal: jest.fn(),
  menuDetails: {
    id: 2,
    mainMeal: {
      name: "Rice"
    }
  },
  deleteMenu: jest.fn(),
  deleting: false
};

const wrapper = shallow(<DeleteMenuModal {...props} />);

describe('Admin::DeleteModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call deleteMenu', () => {
    wrapper.setProps({
      display:true,
    }) 
    wrapper.find('#delete-meal').simulate('click');
    expect(wrapper.find('.modal-content')).toBeTruthy()
  });
});
