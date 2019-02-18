/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import Tab from '../../../../components/common/Tab/Tab';

const props = {
  label: "king",
  onClick: jest.fn()
};

const wrapper = mount(<Tab {...props} />);

describe('Tab Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onClick method', () => {
    const onClickSpy = jest.spyOn(wrapper.instance(), 'onClick');
    wrapper.instance().onClick("Second");
    expect(onClickSpy).toHaveBeenCalled();
  });

});