/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
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

const wrapper = mount(<DeleteMenuModal {...props} />);

describe('Admin::DeleteModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
