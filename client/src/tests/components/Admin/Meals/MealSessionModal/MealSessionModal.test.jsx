/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import MealSessionModal from '../../../../../components/Admin/Meals/MealSessionModal/MealSessionModal'; /* eslint-disable-line */

import AddMealSessionFields from '../../../../../components/Admin/Meals/MealSessionModal/AddMealSessionFields'; /* eslint-disable-line */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = (edit) => {
  const props = {
    show: true,
    edit,
    toggleAddEditModal: jest.fn(),
    onChange: jest.fn(),
    mealSessionDetails: {
      name: 'Lunch',
      date: moment(),
      startTime: moment(),
      endTime: moment(),
    },
  };

  const store = mockStore({
    mealSessions: {
      isLoading: false,
      meals: [],

      mealSessionModal: {
        show: false,
        edit,
      },
    },
  });

  const wrapper = mount(
    <BrowserRouter>
      <MealSessionModal store={store} {...props} />
    </BrowserRouter>
  );

  return wrapper;
};

let wrapper = setup(false);

describe('MealModal Component', () => {
  const mealSessionObject = {
    name: 'Lunch',
    date: moment(),
    startTime: moment(),
    endTime: moment(),
  };

  const mealSessionModalWrap = wrapper.find('MealSessionModal');
  const mealModal = mealSessionModalWrap.instance();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call the onChange method', () => {
    const name = 'Breakfast';
    const event = {
      target: {
        name: 'name',
        value: name,
      },
    };
    const spy = jest.spyOn(
      wrapper
        .children()
        .children()
        .props(),
      'onChange'
    );
    wrapper.find('[name="name"]').simulate('change', event);

    expect(spy).toHaveBeenCalledWith(name, 'name');
  });

  it('should call closeModal', () => {
    const spy = jest.spyOn(
      wrapper
        .children()
        .children()
        .children()
        .props(),
      'toggleAddEditModal'
    );

    wrapper
      .children()
      .children()
      .children()
      .find('.close-icon', '.btn-no-style')
      .simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('shoudl call the onsubmit method', () => {
    const spy = jest.spyOn(
      wrapper
        .children()
        .children()
        .children()
        .props(),
      'toggleAddEditModal'
    );

    const fakeEvent = { preventDefault: () => {} };

    wrapper.find('#add-meal-form').simulate('submit', fakeEvent);

    expect(spy).toHaveBeenCalled();
  });

  it('should derive state from props if edit is true', () => {
    wrapper = setup(true);
  });
});
