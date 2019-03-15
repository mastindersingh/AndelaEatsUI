import React from 'react';
import { shallow } from 'enzyme';
import FaqItem from '../../../components/Faqs/FaqItem';

const props = {
  faq: {
    question: "First question",
    answer: "First answer",
    id: 0
  }
};

let wrapper;
/* 
global jest 
expect 
*/
describe('FaqItem Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<FaqItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
