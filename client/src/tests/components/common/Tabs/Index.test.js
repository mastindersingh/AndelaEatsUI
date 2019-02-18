/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';

import Tabs from '../../../../components/common/Tab/Index';

const comp = {
  props: {
    children: [{ props: { label: "Vendors" }}]
  }
}

const setup = () => {
  const state = {
    activeTab: comp
  };

  const props = {
      children: [{
        props: {
          label: "Vendor"
        }
      }]
  };

  return mount(<Tabs {...props} />);
};

const wrapper = setup();


describe.only('Tab Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an Tab Component', () => {
    expect(wrapper.find('Tab').exists()).toBe(true);
  });

    it('should call onClickTabItem method', () => {
      const onClickTabItemSpy = jest.spyOn(wrapper.instance(), 'onClickTabItem');
      wrapper.instance().onClickTabItem("Second");
      wrapper.setState({ activeTab: "Second" });
      expect(onClickTabItemSpy).toHaveBeenCalled();
    });
});