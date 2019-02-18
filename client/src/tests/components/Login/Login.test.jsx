import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../../components/Login/Login';

jest.mock("../../../helpers/checkLogin");
/* 
global jest 
expect 
*/
describe('Login Component', () => {
  const wrapper = shallow(<Login />);
  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('renders a div', () => {
    expect(wrapper.find('Redirect').length).toBe(0);
  });
});
