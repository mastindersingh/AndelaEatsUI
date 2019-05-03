import React from 'react';
import { mount } from 'enzyme';
import { MenuTable,mapStateToProps } from '../../../../components/Admin/Menus/MenuTable';
import menuList from '../../../__mocks__/mockMenuList';
import engagements from '../../../__mocks__/mockEngagements';


describe('Menu Table Component', () => {
    let wrapper;
    beforeEach(() => {
        const props = {
            menus: {menuList},
            showAddModal: jest.fn(),
            showDeleteModal: jest.fn(),
        }
        wrapper = mount(<MenuTable {...props} />);
    })

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });

    it('call showAddModal on click edit', () => {
        const spy = jest.spyOn(wrapper.instance().props, 'showAddModal')
        wrapper.find('.edit-menu').at(0).simulate('click');
        expect(spy).toHaveBeenCalled()
    });

    it('call showDeleteModal on click edit', () => {
        const spy = jest.spyOn(wrapper.instance().props, 'showDeleteModal')
        wrapper.find('.delete-menu').at(0).simulate('click');
        expect(spy).toHaveBeenCalled()
    });

    it('shows menus for a user', () => {
        wrapper.setProps({
            preview:true,
        });
        expect(wrapper.find('.menu-header').text()).toEqual('Available Menus');
    })

    it('renders EmptyContent when there are no menus', () => {
        wrapper.setProps({
            preview:true,
            menus: {menuList: []},
            engagements: [],
        });
       expect(wrapper.find('.empty-content')).toBeTruthy()
    });
    it('shows loader', () => {
        wrapper.setProps({
            menus: {menuList: [], isLoading: true},
        });
       expect(wrapper.find('.loader-container')).toBeTruthy()
    });

  it('should toggle Rating Modal', () => {
      wrapper.setProps({ preview: true });
      wrapper.find('.rate-vendor-button').simulate('click');
      wrapper.setProps({ isFetching: true });
  });


    describe('mapStateToProps', () => {
        it('maps engagements from props to state', () => {
            const initialState = {
                allEngagements: { engagements: { engagements: [engagements[1]] } },
                allVendors: { isLoading: false }
            }
           expect(mapStateToProps(initialState).engagements.length).toEqual(1);
        });
    })
})
