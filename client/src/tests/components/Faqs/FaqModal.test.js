import React from 'react';
import { shallow } from 'enzyme';

import FaqModal from '../../../components/Faqs/FaqModal';
/* 
global jest 
expect 
*/
describe('FaqModal', () => {
  const props = {
    show: true,
    error: '',
    faq: {},
    handleModal: jest.fn(),
    isCreating: false,
    isUpdating: false,
    createFaq: jest.fn(() => Promise.resolve()),
    updateFaq: jest.fn(() => Promise.resolve())
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FaqModal {...props} />);
  });

  it('shows Loader', () => {
    wrapper.setProps({
      isCreating: true
    });
    expect(wrapper.find('.loader-container')).toBeTruthy();
  });

  it('handles onChange', () => {
    wrapper.find('#question').simulate('change', {
      target: { name: 'question', value: 'First question' }
    });

    expect(wrapper.instance().state.faq.question).toEqual('First question');
  });

  it('sets error on submitting empty answer', () => {
    const instance = wrapper.instance();
    wrapper.find('#question').simulate('change', {
      target: { name: 'question', value: 'kkk' }
    });
    instance.faqFormIsValid();
    expect(instance.state.errors.answer).toEqual('Field cannot be empty.');
  });

  it('sets error on submitting empty question', () => {
    wrapper.setProps({
      faq: { id: 1, question: '', answer: 'answer' }
    });
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(instance.state.errors.question).toEqual('Field cannot be empty.');
  });

  it('submits new question', () => {
    wrapper.find('#question').simulate('change', {
      target: { name: 'question', value: 'first question' }
    });

    wrapper.find('#answer').simulate('change', {
      target: { name: 'answer', value: 'answer' }
    });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
  });

  it('submits edits question', () => {
    wrapper.setProps({
      faq: { id: 1, question: 'questionaire', answer: 'answer' }
    });
    wrapper.find('#question').simulate('change', {
      target: { name: 'question', value: 'first question' }
    });

    wrapper.find('#answer').simulate('change', {
      target: { name: 'answer', value: 'answer' }
    });

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
