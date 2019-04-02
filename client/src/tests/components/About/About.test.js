import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { About, mapStateToProps } from '../../../components/About/About';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const props = {
  fetchAbout: jest.fn(),
  updateAbout: jest.fn(),
  display: true,
  isLoading: false,
  isAdmin: 1,
  about: {
    details: 'First details',
    id: 0
  }
};

const store = mockStore({
  aboutReducer: {
    ...props,
    isCreating: false,
    isUpdating: false
  },
  user: { role: 1 }
});

let wrapper;

/* 
global jest 
expect 
*/
describe('About Component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <About {...props} />
      </Provider>
    );
  });
  it('should mount successfully', () => {
    expect(wrapper).toBeDefined();
  });

  it('shows loader', () => {
    const child = mount(wrapper.get(0));
    child.setProps({
      about: {},
      isLoading: true,
      isAdmin: 0
    });

    expect(child.find('.loader-container')).toBeTruthy();
  });

  it('shows modal on click showAboutModal', () => {
    const child = mount(wrapper.get(0));
    const instance = child.instance();

    expect(instance.state.showModal).toBeFalsy();
    child.find('.add-about-right').simulate('click');
    expect(instance.state.showModal).toBeTruthy();
  });

  it('should show modal on click edit', () => {
    const child = mount(wrapper.get(0));
    const instance = child.instance();

    expect(instance.state.showModal).toBeFalsy();
    child.find('.fa-edit').simulate('click');
    expect(instance.state.showModal).toBeTruthy();
  });

  describe('mapStateToProps', () => {
    it('should map About to state', () => {
      const initialState = {
        aboutReducer: { about: {} },
        user: { role: 1 }
      };
  
      expect(mapStateToProps(initialState).about).toEqual({});
    });
  });
});
