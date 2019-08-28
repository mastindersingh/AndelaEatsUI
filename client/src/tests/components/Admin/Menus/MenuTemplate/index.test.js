/* eslint-disable no-undef */
import '../../../../__mocks__/selectMock';
import React from 'react';
import { mount } from 'enzyme';
import { MenuTemplate }
  from '../../../../../components/Admin/Menus/MenuTemplate';

const props = {
  menuTemplates: { name: 'food' },
  error: '',
  addMenuTemplate: jest.fn(() => Promise.resolve())
};

describe('Admin: Menu Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <MenuTemplate {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });


  it('should open modal', () => {
    wrapper.find('button[name="add-btn"]').simulate('click');
    expect(wrapper.instance().state.displayModal).toBe(true);
  });
  it('should close Modal', () => {
    wrapper.find('button[name="add-btn"]').simulate('click');
    wrapper.find('button[name="cancel"]').simulate('click');

    expect(wrapper.instance().state.displayModal).toBe(false);
  });

  it('should throw error if there is an empty form field', () => {
    wrapper.find('button[name="add-btn"]').simulate('click');
    jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit();

    expect(wrapper.instance().state.errors.description).toBe('*required');
  });

  it('should call handleChange on input change', () => {
    const event = { target: { name: 'title', value: 'javas' } };
    wrapper.find('button[name="add-btn"]').simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');
    wrapper.instance().forceUpdate();
    wrapper.find('input[name="title"]').simulate('change', event);
    expect(spy).toBeCalled();
  });
  it('should call handleChange on select change', () => {
    const event = { target: { value: "breakfast" } };

    wrapper.find('button[name="add-btn"]').simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleChange');

    wrapper.instance().forceUpdate();
    wrapper.find('#select').simulate('change', event);
    expect(spy).toBeCalled();
  });

  it('should submit data sucessfully  handle submit ', () => {
    wrapper.find('button[name="add-btn"]').simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');

    wrapper.setState({
      title: 'new title',
      description: 'food template',
      mealPeriod: 'lunch'
    });

    wrapper.find('button[name="ADD TEMPLATE"]').simulate('click');
    wrapper.setProps({ menuTemplate: { name: 'new title' } });

    expect(spy).toBeCalled();
  });
});
