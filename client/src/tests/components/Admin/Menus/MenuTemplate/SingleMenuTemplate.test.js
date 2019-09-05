import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { SingleMenuTemplate } from
  '../../../../../components/Admin/Menus/MenuTemplate/SingleMenuTemplate';
import { menuTemplates } from '../../../../__mocks__/menuTemplate';

describe('SingleMenuTemplate page', () => {
  let wrapper;
  const props = {
    menuTemplate: menuTemplates[0],
    getMenuTemplate: () => Promise.resolve(),
    match: { params: { id: menuTemplates[0].id } }
  };

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <SingleMenuTemplate {...props} />
      </Router>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should add active class to clicked day', () => {
    wrapper.find('span[name="Tuesday"]').simulate('click');
    expect(wrapper.find('span[name="Tuesday"]').hasClass('active')).toBe(true);
  });
});
