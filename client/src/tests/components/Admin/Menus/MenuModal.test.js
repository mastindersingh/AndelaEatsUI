/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import MenuModal from '../../../../components/Admin/Menus/MenuModal';
import { mockMenuItem, menu } from '../../../__mocks__/mockMenuItems';
import vendorEngagements from '../../../__mocks__/mockEngagements';
import Select from 'react-select';

describe('MenuModal Component', () => {
  const setup = () => {
    const props = {
      modalButtontext: 'ADD MENU',
      closeModal: jest.fn(),
      handleSubmit: jest.fn(),
      vendorEngagements: [
        {
          vendorId: '',
          vendor: { name: '' },
          startDate: '',
          endDate: ''
        }
      ],
      mealItems: [
        {
          description: "Jollof Rice",
          id: 1,
          image: "google.com",
          isDeleted: false,
          mealType: "main",
          name: "Rice"
        },
        {
          description: "Fried Chicken",
          id: 3,
          image: "google.com",
          isDeleted: false,
          mealType: "protein",
          name: "Chicken",
        },
        {
          description: "Baked beans",
          id: 4,
          image: "google.com",
          isDeleted: false,
          mealType: "side",
          name: "Moi Moi",
        }
      ]
    };

    return mount(<MenuModal {...props} />);
  };

  const wrapper = setup();
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call formValidation method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'formValidation');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().formValidation(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChange method', () => {
    const onChangeSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange([mockMenuItem[0]], 'menuItem');
    expect(onChangeSpy).toHaveBeenCalled();
    expect(wrapper.state().menuItem).toEqual([mockMenuItem[0]]);
  });

  it('should call handleCloseModal method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleCloseModal');
    const event = { preventDefault: jest.fn() };
    wrapper.instance().handleCloseModal(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should call checkAllowedSelection  method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'checkAllowedSelection');
    wrapper.instance().checkAllowedSelection();
    expect(spy).toHaveBeenCalled();
  });

  describe('Component methods', () => {
    it('componentWillReceiveProps', () => {
      const nextProps = {
        menu: menu[0],
        vendorEngagements,
      }
      const instance = wrapper.instance()
      const spy = jest.spyOn(instance, 'componentWillReceiveProps');
      instance.componentWillReceiveProps(nextProps);
      expect(spy).toHaveBeenCalled();
    });
  })
});
