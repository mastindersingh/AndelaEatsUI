/* eslint-disable no-undef */
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../../components/Admin/Vendors/Modal';


const setup = (
  vendorName, 
  vendorAddress, 
  phoneNumber, 
  modalTitle, 
  modalButtontext,
  contactPerson, 
) => {
  const props = {
    onChange: jest.fn(),
    closeModal: jest.fn(),
    vendorName, 
    vendorAddress, 
    phoneNumber, 
    contactPerson, 
    errors: {},
    displayModal: true,
    isCreating: false,
    isUpdating: false,
    formValidation: jest.fn(),
    clearErrors: jest.fn(),
    modalTitle,
    modalButtontext
  };

  return shallow(<Modal {...props} />);
};

const wrapper = setup();

describe('Modal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
