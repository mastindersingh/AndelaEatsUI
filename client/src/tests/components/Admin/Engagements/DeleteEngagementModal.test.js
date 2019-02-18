/* eslint-disable no-undef */
import React, { Component } from 'react';
import { mount } from 'enzyme';
import DeleteEngagementModal from '../../../../components/Admin/Engagements/DeleteEngagementModal'


const setup = () => {
  const props = {
    modalContent: {
      contactPerson: "Chibueze",
      createdAt: "Fri, 14 Sep 2018 06:52:30 GMT",
      id: "-LMLqYeE1Ubdy79p4Nwo",
      phoneNumber: "01234567890",
      updatedAt: "Fri, 14 Sep 2018 06:52:30 GMT",
      vendorAddress: "No 233, Ikorodu road, Lagos",
      vendorName: "Mr Medium"
    },
    displayDeleteModal: true,
    closeModal: jest.fn(),
    deleteEngagement: jest.fn(),
  };

  return mount(<DeleteEngagementModal {...props} />);
};

const wrapper = setup(true);

describe('DeleteEngagementModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should simulate delete button click', () => {
    wrapper.find('.delete-vendor').simulate('click');
  });
});
