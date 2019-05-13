/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Sessions from '../../../../components/Admin/Meals/Sessions'; /* eslint-disable-line */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = () => {
  const props = {
    displayMealSessionModal: true,
    showMealSessionModal: jest.fn(),
    hideMealSessionModal: jest.fn(),
  };

  const store = mockStore({
    mealSessions: {
      mealSessionModal: {
        show: true,
      },
    },
  });

  const wrapper = shallow(<Sessions store={store} {...props} />).dive();

  return wrapper;
};

const wrapper = setup();

describe('MealModal Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });
  it('should open the modal and update the state with the meal details', () => {
    wrapper.instance().toggleAddEditModal({}, true);
    expect(wrapper.instance().state).toEqual({ mealSessionDetails: {} });
  });

  it('should hide the modal too', () => {
    wrapper.instance().onChange('some-passed-value', 'name');
    expect(wrapper.state().mealSessionDetails.name).toBe('some-passed-value');
  });

  it('should toggle the model', () => {
    const spy = jest.spyOn(wrapper.instance(), 'toggleAddEditModal');
    wrapper.find('[type="button"]').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('displays the meal session modal', () => {
    wrapper.setProps({ displayMealSessionModal: false });
    wrapper.instance().toggleAddEditModal({}, true);
    expect(wrapper.instance().state).toEqual({ mealSessionDetails: {} });
  });
});
