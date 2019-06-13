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
    isLoading: false,
    createFaq: jest.fn(() => Promise.resolve()),
    updateFaq: jest.fn(() => Promise.resolve()),
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    faqFormIsValid: jest.fn()   
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FaqModal {...props} />);
  });

  it('shows Loader', () => {
    wrapper.setProps({
      isLoading: true
    });
    expect(wrapper.find('.loader-container')).toBeTruthy();
  });
});
