/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { EngagementCard } from '../../../../components/Admin/Engagements/EngagementCard';
import engagements from '../../../__mocks__/mockEngagements';
import { format, addDays, subDays } from 'date-fns';

jest.mock('../../../../helpers/dateFormatter.js');

const setup = () => {
  const props = {
    engagement: engagements[0],
    handleNoEdit: jest.fn(),
  };

  return mount(<EngagementCard {...props} />);
};

const wrapper = setup();

describe('EngagementCard Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should not edit past engagement', () => {
    wrapper.find('.edit--disabled').simulate('click'); 
    expect(wrapper.find('.Toastify__toast Toastify__toast--error')).toBeTruthy();
  });

  it('should edit engagement', () => {
    wrapper.setProps({
      showEditModal: jest.fn(),
      engagement: {
        ...engagements[0],
        endDate: format(addDays(new Date(), 10)),
      }
    })
    wrapper.find('.edit').simulate('click');
    expect(wrapper.find('.Toastify__toast Toastify__toast--success')).toBeTruthy();
  })

  it('should delete engagement', () => {
    wrapper.setProps({
      showEditModal: jest.fn(),
      showDeleteModal: jest.fn(),
      engagement: {
        ...engagements[0],
        endDate: format(addDays(new Date(), 10)),
      }
    })
    wrapper.find('.delete-color').simulate('click');
    expect(wrapper.find('.Toastify__toast Toastify__toast--success')).toBeTruthy();
  })
});
