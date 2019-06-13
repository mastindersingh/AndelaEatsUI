import React from 'react';
import { mount } from 'enzyme';
import DeleteModal from '../../../components/common/DeleteModal/DeleteModal';

/* 
global jest 
expect 
*/

const props = {
  closeModal: jest.fn(),
  isDeleting: true,
  displayDeleteModal: true,
  deleteItem: jest.fn(),
  modalContent: { firstName: 'fred', id: 1, lastName: 'yiga' },
  item: 'User'
};
let wrapper;

describe('Delete Modal', () => {
  beforeEach(() => {
    wrapper = mount(<DeleteModal {...props} />);
  });

  it('shows Loader', () => {
    expect(wrapper.find('.loader-container')).toBeTruthy();
  });
});
