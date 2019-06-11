/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MealSession from '../../../../components/Admin/Meals/MealSession'; /* eslint-disable-line */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = () => {
  const props = {
    session: {
      name: 'Lunch',
      date: '',
      startTime: '',
      endTime: '',
      isDelete: false,
    },
    toggleAddEditModal: jest.fn(),
  };

  const store = mockStore({});

  const wrapper = mount(
    <BrowserRouter>
      <MealSession store={store} {...props} />
    </BrowserRouter>
  );

  return wrapper;
};

const wrapper = setup();

describe('MealModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call the toggleAddEditModal method to toggle the modal', () => {
    const spy = jest.spyOn(
      wrapper
        .children()
        .children()
        .instance().props,
      'toggleAddEditModal'
    );

    wrapper
      .children()
      .children()
      .children()
      .find('.edit--color')
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the showDeleteMealSessionModal method', () => {
    wrapper
      .children()
      .children()
      .children()
      .find('.delete-color')
      .simulate('click');
    expect(
      wrapper
        .children()
        .children()
        .instance().state
    ).toEqual({ displayDeleteModal: true });
  });

  it('should close the modal', () => {
    wrapper
      .children()
      .children()
      .instance()
      .closeModal();
    expect(
      wrapper
        .children()
        .children()
        .instance().state
    ).toEqual({ displayDeleteModal: false });
  });

  it('should delete a meal item', () => {
    wrapper
      .children()
      .children()
      .instance()
      .deleteItem();
    expect(
      wrapper
        .children()
        .children()
        .instance().state
    ).toEqual({ displayDeleteModal: false });
  });
});
