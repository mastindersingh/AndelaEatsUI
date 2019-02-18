/* eslint-disable no-undef */
import React, { Component } from 'react';
import { mount } from 'enzyme';
import DeleteMealModal from '../../../../components/Admin/Meals/DeleteMealModal';

const setup = (status) => {
  const props = {
    displayDeleteModal: status,
    modalContent: {

    },
    deleteMealItem: jest.fn(),
    closeModal: jest.fn()
  };

  return mount(<DeleteMealModal {...props} />);
};

const wrapper = setup(true);

describe('DeleteMealModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should simulate delete button click', () => {
    wrapper.find('#delete-meal').simulate('click');
  });
});