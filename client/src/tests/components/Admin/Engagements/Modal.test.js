/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../../components/Admin/Engagements/Modal';

const props = {
  selectOption: null,
  displayModal: true,
  modalTitle: '',
  modalButtontext: '',
  closeModal: jest.fn(),
  onChange: jest.fn()
};
const setup = () => (
  shallow(<Modal {...props} />)
);

const wrapper = setup();

describe('Add Engagement Modal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call onChange when a vendor is selected', () => {
    wrapper.find('StateManager').simulate('change', { target: { value: "cafe" } });
    expect(props.onChange).toBeCalled();
  });

  it('should call onChange when start date is selected', () => {
    wrapper.find('DatePicker[name="start-date"]').simulate('change', { target: { value: "2" } });
    expect(props.onChange).toBeCalled();
  });

  it('should call onChange when end date is selected', () => {
    wrapper.find('DatePicker[name="end-date"]').simulate('change', { target: { value: "2" } });
    expect(props.onChange).toBeCalled();
  });
});
