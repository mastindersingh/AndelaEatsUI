import React from 'react';
import { shallow } from 'enzyme';
import SideNav from '../../../components/common/Sidenav/Sidenav';

const props = {
  children: <div>A test child</div>,
  location: {
    pathname: '/orders'
  }
};

let mockAuthorization;
jest.mock('../../../helpers/authorization', () => ({
  isAuthorized: () => mockAuthorization,
  isAdmin: () => true,
}));

let wrapper;

/*
global jest
expect
*/
describe('NotCollectedAction Component', () => {
  mockAuthorization = true;
  it('should render successfully', () => {

    wrapper = shallow(<SideNav {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should check for admin routes', () => {
    wrapper = shallow(<SideNav {...props} />);
    wrapper.instance().checkAdmin();
  });

  it('should change hideSubMenu state ', () => {
    wrapper.instance().toggleSubMenu();
    expect(wrapper.instance().state.hideSubMenu).toBe(false);
  });

  it('should change hideSubBVendor state ', () => {
    wrapper.instance().toggleSubVendor();
    expect(wrapper.instance().state.hideSubVendor).toBe(false);
  });

  it('should redirect to login if not authorized ', () => {
    mockAuthorization = false;
    wrapper = shallow(<SideNav {...props} />);
    expect(wrapper.find('Redirect').length).toEqual(1);
  });
});
