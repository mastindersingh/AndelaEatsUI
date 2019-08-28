import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { ListMenuTemplate, mapStateToProps, mapDispatchToProps } from
  '../../../../components/Admin/Menus/MenuTemplate/listMenuTemplate';

describe('Unit test for the MenuTemplate page', () => {
  const propsObj = {
    menuTemplates: { menuTemplates: [], isLoading: true },
    getMenuTemplates: () => Promise.resolve(),
  };
  it('should call getMenuTemplates when the menuTemplate page '
    + 'component is mounted', () => {
    const menuTemplateInstance = new ListMenuTemplate();
    const spiedMethod = jest.spyOn(menuTemplateInstance, 'getMenuTemplates')
      .mockReturnValueOnce(true);
    menuTemplateInstance.componentDidMount();
    expect(spiedMethod.mock.calls.length).toEqual(1);
  });
  it('should render a table with table-header, table-body and two table'
  + ' columns when there is two available menu-templates', () => {
    propsObj.menuTemplates.menuTemplates = [{ name: 'name 1' }, { name: 2 }];
    const wrapper = shallow(<ListMenuTemplate {...propsObj} />);
    expect(wrapper.find('#table-wrapper').length).toEqual(1);
    expect(wrapper.find('#menu-template-header').length).toEqual(1);
    expect(wrapper.find('#menu-template-table-header').length).toEqual(1);
    expect(wrapper.find('TemplateRow').length).toEqual(2);
  });
  it('should make the table wrapper blurry when waiting '
  + 'for a response from the server ', () => {
    propsObj.menuTemplates.isLoading = false;
    const wrapper = shallow(<ListMenuTemplate {...propsObj} />);
    expect(wrapper.find('#table-wrapper').hasClass('blurred')).toEqual(false);
  });
});
