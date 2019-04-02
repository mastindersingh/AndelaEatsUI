import React from 'react';
import { shallow } from 'enzyme';
import NotCollectedAction from '../../../components/MealCard/NotCollectedAction'; //eslint-disable-line
import { addDays, subDays } from 'date-fns';

const props = {
  id: '0023',
  baseUrl: '/orders',
  meal: {
    id: '2',
    name: {
      main: "Beans",
      protein: "Cake"
    },
    orderDate: '2/5/2018'
  },
  showModal: () => Promise.resolve()
};

let wrapper;
/* 
global jest 
expect 
*/
describe('NotCollectedAction Component', () => {
  it('should render atleast once', () => {
    wrapper = shallow(<NotCollectedAction {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('calls showModal on click collect', () => {
    wrapper = shallow(<NotCollectedAction {...props} />);
    wrapper.setProps({
      meal: {
        ...props.meal,
        dateBookedFor: addDays(new Date(), 7),
      }
    }) 
    wrapper.find('.test').at(1).simulate('click');
    wrapper.find('.rate-button').simulate('click');
  })

  it('calls showModal on click edit', () => {
    wrapper = shallow(<NotCollectedAction {...props} />);
    wrapper.setProps({
      meal: {
        ...props.meal,
        dateBookedFor: subDays(new Date(), 7),
      }
    })
   wrapper.find('.rate-button').simulate('click');
  })
});
