import React from 'react';
import { mount } from 'enzyme';
import { Faqs, mapStateToProps } from '../../../components/Faqs/Faqs';

const faq = {
  question: 'First question',
  answer: 'First answer',
  id: 0
};
const props = {
  fetchFaqs: jest.fn(),
  createFaq: jest.fn(() => Promise.resolve()),
  deleteFaq: jest.fn(() => Promise.resolve()),
  updateFaq: jest.fn(() => Promise.resolve()),
  isLoading: false,
  handleModal: jest.fn(),
  isAdmin: 1,
  faqs: [
    faq
  ]
};

let wrapper;

/* 
global jest 
expect 
*/
describe('FaqItem Component', () => {
  beforeEach(() => {
    wrapper = mount(
      <Faqs {...props} /> 
    );

    wrapper.setState({
      showModal: true,
    });
  });
  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('should show empty faq message when faqs array is empty', () => {
    wrapper.setProps({
      faqs: []
    });
    wrapper.update();
    expect(wrapper.find('.empty-content').text()).toEqual(
      'No FAQ has been created'
    );
  });

  it('shows loader', () => {
    wrapper.setProps({
      faqs: [],
      isLoading: true,
      isAdmin: 0
    });

    expect(wrapper.find('.loader-container')).toBeTruthy();
  });

  it('shows modal on click showFaqModal', () => {
    const child = mount(wrapper.get(0));
    const instance = child.instance();

    expect(instance.state.showModal).toBeFalsy();
    child.find('.add-right').simulate('click');
    expect(instance.state.showModal).toBeTruthy();
  });

  it('handles onChange', () => {
    wrapper.find('#question').at(1).simulate('change', {
      target: { name: 'question', value: 'First question' }
    });
    expect(wrapper.instance().state.faq.question).toEqual('First question');
  });

  it('sets error on submitting empty question', () => {
    wrapper.setState({
      faq: { id: 1, question: '', answer: 'answer' }
    });
    
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit');
    expect(instance.state.errors.question).toEqual('*required');
  });

  it('sets error on submitting empty answer', () => {
    const instance = wrapper.instance();
    wrapper.find('#question').at(1).simulate('change', {
      target: { name: 'question', value: 'kkk' }
    });
    instance.faqFormIsValid();
    expect(instance.state.errors.answer).toEqual("*required");
  });


  it('submits new question', () => {
    wrapper.find('#question').at(1).simulate('change', {
      target: { name: 'question', value: 'first question' }
    });

    wrapper.find('#answer').at(1).simulate('change', {
      target: { name: 'answer', value: 'answer' }
    });

    wrapper.find('form').simulate('submit');
  });

  it('handles editing a question', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.setState({
      faq: { id: 1, question: 'questionaire', answer: 'answer' }
    });
    wrapper.find('#question').at(1).simulate('change', {
      target: { name: 'question', value: 'first question' }
    });

    wrapper.find('#answer').at(1).simulate('change', {
      target: { name: 'answer', value: 'answer' }
    });
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalled();
  });

  it('calls handleModal on clicking close icon', () => {
    const instance = wrapper.instance();
    expect(instance.state.showModal).toBeTruthy();
    wrapper.find('.close-icon').simulate('click');
    expect(instance.state.showModal).toBeFalsy();
  });

  it('shows deleteModal on click displayDeleteModal', () => {
    wrapper.setState({
      faq,
    });
    const instance = wrapper.instance();
    expect(instance.state.showDeleteModal).toBeFalsy();
    wrapper.find('.fa-trash-alt').simulate('click');
    expect(instance.state.showDeleteModal).toBeTruthy();
  });

  it('should call deleteFaqFunc comfirming delete', () => {
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'deleteFaqFunc');
    wrapper.setState({
      faq
    });

    wrapper.find('.fa-trash-alt').simulate('click');
    wrapper.find('.fill--delete').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(instance.state.showDeleteModal).toBeTruthy();
  });

  it('should show modal on click edit', () => {
    const instance = wrapper.instance();

    expect(instance.state.showModal).toBeTruthy();
    wrapper.find('.fa-edit').simulate('click');
    expect(instance.state.showModal).toBeFalsy();
  });

  describe('mapStateToProps', () => {
    it('should map Faqs to state', () => {
      const initialState = {
        faqsReducer: { faqs: [] },
        user: { role: 1 }
      };
  
      expect(mapStateToProps(initialState).faqs).toEqual([]);
    });
  });
});
