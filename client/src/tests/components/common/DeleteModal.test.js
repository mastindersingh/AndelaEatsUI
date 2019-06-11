import React from 'react';
import { shallow } from 'enzyme';
import DeleteModal from '../../../components/common/DeleteModal/DeleteModal';

const props = {
  closeModal: jest.fn(),
  displayDeleteModal: true,
};

const wrapper = shallow(<DeleteModal {...props} />);
/*
global jest
expect
*/
describe('DeleteModal Component', () => {
  it('should render atleast once', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call closeModal', () => {
    wrapper.find('button[name="close-btn"]').simulate('click');
    expect(props.closeModal).toBeCalled();
  });
});
