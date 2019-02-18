import React from 'react';
import { shallow } from 'enzyme';
import SideNav from '../../../components/common/Sidenav/Sidenav';

const props = {
  children: <div>A test child</div>,
  location: {
    pathname: '/orders'
  }
};

jest.mock('../../../helpers/authorization', () => ({ isAuthorized: jest.fn(() => true) }));
jest.mock('../../../helpers/authorization', () => ({ isAdmin: jest.fn(() => true) }));
jest.mock('../../../helpers/authorization', () => ({ isAuthorized: jest.fn(() => false) }));


let wrapper;

/* 
global jest 
expect 
*/
describe('NotCollectedAction Component', () => {
  it('should render successfully', () => {
    wrapper = shallow(<SideNav {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should check for admin routes', () => {
    wrapper = shallow(<SideNav {...props} />);
    wrapper.instance().checkAdmin();
  });
});
