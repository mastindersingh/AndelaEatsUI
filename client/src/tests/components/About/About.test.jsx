import React from 'react';
import { shallow } from 'enzyme';
import About from '../../../components/About/About';

describe('About Component', () => {
    const wrapper = shallow(<About />);
    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

