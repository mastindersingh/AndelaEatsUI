/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../../components/Admin/Engagements/Modal';

const setup = () => {
  const props = {
    selectOption: null,
    displayModal: true,
    modalTitle: '',
    modalButtontext: ''
  };

  return shallow(<Modal {...props} />);
};

const wrapper = setup();

describe('Add Engagement Modal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
});
