import React from 'react';
import { shallow } from 'enzyme';
import FaqItem from '../../../components/Faqs/FaqItem';

const props = {
  faq: {
    question: 'First question',
    answer: 'First answer',
    id: 0
  },
  showFaqModal: jest.fn(),
  isAdmin: 0
};

/* 
global jest 
expect 
*/
describe('FaqItem Component', () => {
  it('should mount successfully', () => {
    const wrapper = shallow(<FaqItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
