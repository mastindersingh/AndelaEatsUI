import React from 'react';
import { shallow } from 'enzyme';
import ConfirmOrder from '../../../components/Order/ConfirmOrder';
import { mockMenu } from '../../helpers/mockOrders';

const props = {
  toggleModal: () => Promise.resolve(),
  updateOrder: () => Promise.resolve(),
  showToast: () => Promise.resolve(),
  createOrder: () => Promise.resolve(),
  isModalOpen: true,
  menus: [
    {
      date: "2018-11-21",
      id: 29,
      menus: []
    }
  ],
  match: {
    params: { date: "2018-11-21" }
  },
  mealSelected: {
    mainMeal: 1,
    accompaniment1: 1,
    accompaniment2: 1,
  }
};
let wrapper;
/* 
global jest 
expect 
*/
describe('ConfirmOrder Component', () => {
  it('should mount successfully', () => {
    wrapper = shallow(<ConfirmOrder {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Action test', () => {
    it('order meal successfully', () => {
      const createOrderSpy = jest.spyOn(props, 'createOrder');
      wrapper = shallow(<ConfirmOrder {...props} />);
      const confirmOrderSpy = jest.spyOn(wrapper.instance(), 'confirmOrder');
      wrapper.instance().confirmOrder();
      expect(createOrderSpy).toHaveBeenCalled();
      expect(confirmOrderSpy).toHaveBeenCalled();
    });

    it('order meal failure', () => {
      props.createOrder = () => Promise.reject();
      const createOrderSpy = jest.spyOn(props, 'createOrder');
      wrapper = shallow(<ConfirmOrder {...props} />);
      const confirmOrderSpy = jest.spyOn(wrapper.instance(), 'confirmOrder');
      wrapper.instance().confirmOrder();
      expect(createOrderSpy).toHaveBeenCalled();
      expect(confirmOrderSpy).toHaveBeenCalled();
    });

    it('update meal successfully', () => {
      props.menuId = 22;
      const updateOrderSpy = jest.spyOn(props, 'updateOrder');
      wrapper = shallow(<ConfirmOrder {...props} />);
      const confirmOrderSpy = jest.spyOn(wrapper.instance(), 'confirmOrder');
      wrapper.instance().confirmOrder();
      expect(updateOrderSpy).toHaveBeenCalled();
      expect(confirmOrderSpy).toHaveBeenCalled();
    });
  });
});