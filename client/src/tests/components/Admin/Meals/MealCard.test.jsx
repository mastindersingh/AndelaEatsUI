/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';
import MealCard from '../../../../components/Admin/Meals/MealCard';
import { mealItems } from '../../../__mocks__/mockMealItems';

describe('MealCard Component', () => {
  let wrapper;
  let props;
  beforeAll(() => {
    props = {
      ...mealItems[0],
      showDeleteModal: jest.fn(),
      showEditModal: jest.fn()
    };
    wrapper = shallow(<MealCard {...props} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have image div', () => {
    const elements = wrapper.find('.image');
    expect(elements.length).toBe(1);
  });

  it('should have label-container div', () => {
    const elements = wrapper.find('.label-container');
    expect(elements.length).toBe(1);
  });

  it('should have details div', () => {
    const elements = wrapper.find('.details');
    expect(elements.length).toBe(1);
  });

  it('should have controls div', () => {
    const elements = wrapper.find('.controls');
    expect(elements.length).toBe(1);
  });

  it('calls the showEditModal action onClick of Edit button', () => {
    const editButton = wrapper.find('.controls').children().first();
    editButton.simulate('click');
    expect(props.showEditModal).toHaveBeenCalled();
  });

  it('calls the showEditModal action onClick of Edit button', () => {
    const deleteButton = wrapper.find('.controls').children().last();
    deleteButton.simulate('click');
    expect(props.showDeleteModal).toHaveBeenCalled();
  });
});
