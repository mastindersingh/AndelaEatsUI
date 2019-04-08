/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import UserRolesCard from '../../../../components/Admin/Users/UserRoleCard';

const props = {
  role: {
    help: null,
    id: 1,
    isDeleted: false,
    name: "waitressm",
    timestamps: { created_at: "2019-04-23", updated_at: "Tue, 23 Apr 2019 12:05:15 GMT" },
  },
  showPermisionModal: jest.fn(),
  showEditModal: jest.fn(),
  showDeleteModal: jest.fn(),
};
const wrapper = shallow(<UserRolesCard {...props} />);

describe('renders UserRole card', () => {
  it('it should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call showPermisionModal when manage button is clicked', () => {
    wrapper.find('.add--color').simulate('click');
    expect(props.showPermisionModal).toBeCalled();
  });

  it('should call showEditModal when manage button is clicked', () => {
    wrapper.find('.edit--color').simulate('click');
    expect(props.showEditModal).toBeCalled();
  });
  it('should call showDeleteModal when manage button is clicked', () => {
    wrapper.find('.delete-color').simulate('click');
    expect(props.showDeleteModal).toBeCalled();
  });
});
