/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import Select from 'react-select';
import ReactStars from 'react-stars';
import VendorRatingModal from '../../../../components/Admin/Menus/VendorRatingModal';
import { mockMenuItem, menu } from '../../../__mocks__/mockMenuItems';
import vendorEngagements from '../../../__mocks__/mockEngagements';

describe('test suite for VendorRatingModal', () => {
  let wrapper;
  let select;
  let reactStar;

  beforeEach(() => {
    const props = {
      closeModal: jest.fn(),
      engagements: vendorEngagements,
      rateVendor: jest.fn(),
      displayModal: true,
    };
    wrapper = mount(<VendorRatingModal {...props} />);
    select = wrapper.find(Select);
    reactStar = wrapper.find(ReactStars);
  });

  it('should render without breaking', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should rate a vendor', () => {
    // an initial attempt to submit an empty form
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    const selectInput = select.find('input');
    const rate = reactStar.find('span');
    selectInput.simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
    selectInput.simulate('keyDown', { keyCode: 13, key: 'Enter' });
    // an attempt to submit the form without rating
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    rate.at(1).simulate('click', '');
    // an attempt to submit the form without comments
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    wrapper.find('.modal-comment').simulate('change', { target: { value: "Good job!" } });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
  });
});
