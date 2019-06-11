/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import RatingsTabs from '../../../../components/Admin/Ratings/RatingsTabs';

const props = {
  userRatings: [
    {
      result: [{
        mainMeal: 1,
        items: [{ comment: "" }]
      }]
    }],
};

const wrapper = mount(<RatingsTabs {...props} />);

describe('ratingsTabs Component', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
