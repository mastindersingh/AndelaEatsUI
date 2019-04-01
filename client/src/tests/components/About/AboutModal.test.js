import React from 'react';
import { shallow } from 'enzyme';

import AboutModal from '../../../components/About/AboutModal';
/* 
global jest 
expect 
*/
describe('AboutModal', () => {
  const props = {
    show: true,
    error: '',
    about: {},
    handleModal: jest.fn(),
    isUpdating: false,
    updateAbout: jest.fn(() => Promise.resolve())
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AboutModal {...props} />);
  });

  it('shows Loader', () => {
    wrapper.setProps({
      isCreating: true
    });
    expect(wrapper.find('.loader-container')).toBeTruthy();
  });

  it('handles onChange', () => {
    wrapper.find('#details').simulate('change', 'This is it');

    expect(wrapper.instance().state.about.details).toEqual('This is it');
  });

  it('sets error on submitting empty details', () => {
    const instance = wrapper.instance();
    wrapper.find('#details').simulate('change', '');
    instance.aboutFormIsValid();
    expect(instance.state.errors.details).toEqual('Field cannot be empty.');
  });

  it('sets error on submitting empty details', () => {
    wrapper.setProps({
      about: { id: 1, details: '' }
    });
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(instance.state.errors.details).toEqual('Field cannot be empty.');
  });

  it('submits new details', () => {
    wrapper.find('#details').simulate('change', {
      target: { name: 'details', value: 'first details' }
    });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
  });

  it('submits edits details', () => {
    wrapper.setProps({
      about: { id: 1, details: 'detailsaire' }
    });
    wrapper.find('#details').simulate('change', 'first details');

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
  });

  it('calls handleModal on clicking close icon', () => {
    const spy = jest.spyOn(wrapper.instance().props, 'handleModal');
    wrapper.find('.close-icon').simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('calls handleModal on clicking cancel button', () => {
    const spy = jest.spyOn(wrapper.instance().props, 'handleModal');
    wrapper.find('.grayed').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
