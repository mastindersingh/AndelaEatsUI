import React from 'react';
import { mount } from 'enzyme';
import { TappedUsers } from '../../../../components/Admin/Users/TappedUsers';
import { tappedUsers } from '../../../__mocks__/mockAdminUsers';

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

let wrapper;
const props = {
  getTappedUsers: () => Promise.resolve(),
  report: { data: tappedUsers.data.payload },
  handleFilterSubmit: jest.fn()
};

/*
global jest
expect
*/
describe('TappedUsers Component', () => {
  wrapper = mount(<TappedUsers {...props} />)

  it('should render correctly', async () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call handleFilterSubmit', () => {
    wrapper.setState({
      isOpen: true,
      startDate: "1/2/2019",
      endDate: "1/3/2019"
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleFilterSubmit');

    wrapper.instance().forceUpdate();
    wrapper.find('.submit-btn').simulate('click');
    expect(spy).toBeCalled();
  });
  it('should throw error if startdate is greater than enddate', () => {
    wrapper.setState({
      isOpen: true,
      startDate: "1/2/2019",
      endDate: "1/3/2018"
    });

    wrapper.find('.submit-btn').simulate('click');
    expect(wrapper.find('ToastContainer').length).toEqual(1);
  });

  it('should call handleStartDateChange', () => {
    wrapper.setState({
      isOpen: false,
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleStartDateChange');

    wrapper.instance().forceUpdate();
    wrapper.find('button[name="filter-btn"]').simulate('click');
    wrapper.find('input[name="startDate"]').simulate('change');

    expect(spy).toBeCalled();
  });

  it('should call handleEndDateChange', () => {
    wrapper.setState({
      isOpen: false,
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleEndDateChange');

    wrapper.instance().forceUpdate();
    wrapper.find('button[name="filter-btn"]').simulate('click');
    wrapper.find('input[name="endDate"]').simulate('change');
    expect(spy).toBeCalled();
  });

  it('should clear filter', () => {
    wrapper.setState({
      isOpen: true,
      startDate: "1/2/2019",
    });
    wrapper.find('.action-item').first().simulate('click');
    expect(wrapper.instance().state.startDate).toEqual(null);
  });

  it('should toggle filter ', () => {
    wrapper.setState({
      isOpen: false,
    });

    wrapper.find('button[name="filter-btn"]').simulate('click');
    expect(wrapper.instance().state.isOpen).toBe(true);
    wrapper.find('button[name="filter-btn"]').simulate('click');
    expect(wrapper.instance().state.isOpen).toBe(false);
  });
});