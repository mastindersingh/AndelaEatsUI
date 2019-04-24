/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import AddMealSessionFields from '../../../../../components/Admin/Meals/MealSessionModal/AddMealSessionFields'; /* eslint-disable-line */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = (edit) => {
  const props = {
    state: {
      date: moment(),
      name: 'Lunch',
      startTime: moment(),
      endTime: moment(),
    },
    errors: [],
    onChange: jest.fn(),
  };

  const store = mockStore({
    mealSessions: {
      isLoading: false,
      meals: [],

      mealSessionModal: {
        show: false,
        edit: false,
      },
    },
  });

  const wrapper = mount(
    <BrowserRouter>
      <AddMealSessionFields store={store} {...props} />
    </BrowserRouter>
  );

  return wrapper;
};

const wrapper = setup(false);

describe('MealModal Component', () => {
  const mealSessionObject = {
    name: 'Lunch',
    date: moment(),
    startTime: moment(),
    endTime: moment(),
  };

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
  it('should not call the fn onChange on the AddMealSessionFields props immediately', () => {
    console.log(
      'WRAPPER__:',
      wrapper
        .find('DatePicker')
        .at(0)
        .debug()
    );
    const spy = jest.spyOn(
      wrapper.children().instance().props.children.props,
      'onChange'
    );
    wrapper
      .find('DatePicker')
      .at(0)
      .simulate('change');
    wrapper
      .find('DatePicker')
      .at(1)
      .simulate('change');
    wrapper
      .find('DatePicker')
      .at(2)
      .simulate('change');
    expect(spy).not.toHaveBeenCalled();
  });
  it('should call the onChange method on the props of AddMealSessionFields', () => {
    const spy = jest.spyOn(
      wrapper.children().instance().props.children.props,
      'onChange'
    );
    wrapper
      .find('DatePicker')
      .at(0)
      .props()
      .onChange('12-08-2019');
    expect(spy).toHaveBeenCalled();
  });
});
