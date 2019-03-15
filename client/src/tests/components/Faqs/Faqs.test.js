import React from 'react';
import { shallow, mount } from 'enzyme';
import { Faqs } from '../../../components/Faqs/Faqs';

const emptyProps = {
  fetchFaqs: jest.fn(),
  faqs: []
};

const props = {
  fetchFaqs: jest.fn(),
  isLoading: false,
  faqs: [{ 
    question: "First question",
    answer: "First answer",
    id: 0
  }]
};

let wrapper;
/* 
global jest 
expect 
*/
describe('FaqItem Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<Faqs {...emptyProps} />);
    expect(wrapper).toBeDefined();
  });

  it('should show empty faq message when faqs array is empty', () => {
    wrapper = mount(<Faqs {...emptyProps} />);
    expect(wrapper.find('.empty-content').text())
      .toEqual("No FAQ has been created");
  });

  it('should not show empty faq message when faqs array is not empty', () => {
    wrapper = mount(<Faqs {...props} />);
    expect(wrapper.exists('.empty-content')).toEqual(false);
  });
});
