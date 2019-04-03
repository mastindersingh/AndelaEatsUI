import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Faqs, mapStateToProps } from '../../../components/Faqs/Faqs';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const props = {
  fetchFaqs: jest.fn(),
  createFaq: jest.fn(),
  deleteFaq: jest.fn(() => Promise.resolve()),
  updateFaq: jest.fn(),
  display: true,
  isLoading: false,
  isAdmin: 1,
  faqs: [
    {
      question: 'First question',
      answer: 'First answer',
      id: 0
    }
  ]
};

const store = mockStore({
  faqsReducer: {
    ...props,
    isCreating: false,
    isUpdating: false
  },
  user: { role: 1 }
});

let wrapper;

/* 
global jest 
expect 
*/
describe('FaqItem Component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Faqs {...props} />
      </Provider>
    );
  });
  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('should show empty faq message when faqs array is empty', () => {
    const child = mount(wrapper.get(0));
    child.setProps({
      faqs: []
    });
    expect(child.find('.empty-content').text()).toEqual(
      'No FAQ has been created'
    );
  });

  it('shows loader', () => {
    const child = mount(wrapper.get(0));
    child.setProps({
      faqs: [],
      isLoading: true,
      isAdmin: 0
    });

    expect(child.find('.loader-container')).toBeTruthy();
  });

  it('shows modal on click showFaqModal', () => {
    const child = mount(wrapper.get(0));
    const instance = child.instance();

    expect(instance.state.showModal).toBeFalsy();
    child.find('.add-right').simulate('click');
    expect(instance.state.showModal).toBeTruthy();
  });

  it('shows deleteModal on click displayDeleteModal', () => {
    const child = mount(wrapper.get(0));
    const instance = child.instance();

    expect(instance.state.showDeleteModal).toBeFalsy();
    child.find('.fa-trash-alt').simulate('click');
    expect(instance.state.showDeleteModal).toBeTruthy();
  });

  it('should call deleteFaqFunc comfirming delete', () => {
    const child = mount(wrapper.get(0));
    const instance = child.instance();
    const spy = jest.spyOn(instance, 'deleteFaqFunc');
  
    child.find('.fa-trash-alt').simulate('click');
    child.find('.fill--delete').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(instance.state.showDeleteModal).toBeTruthy();
  });

  it('should show modal on click edit', () => {
    const child = mount(wrapper.get(0));
    const instance = child.instance();

    expect(instance.state.showModal).toBeFalsy();
    child.find('.fa-edit').simulate('click');
    expect(instance.state.showModal).toBeTruthy();
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
