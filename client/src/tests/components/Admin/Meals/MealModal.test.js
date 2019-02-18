/* eslint-disable no-undef */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MealModal from '../../../../components/Admin/Meals/MealModal/Index'; /* eslint-disable-line */
import { mealItems } from '../../../__mocks__/mockMealItems';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = (edit) => {
  const props = {
    show: true,
    edit,
    toggleAddModal: jest.fn(),
    editMealItem: jest.fn(),
    mealDetails: { ...mealItems[0] }
  };

  const store = mockStore({
    mealItems: {
      isLoading: false,
      meals: [],
    
      mealModal: {
        show: false,
        addBtnDisabled: false,
        errors: ['name'],
        isLoading: false
      }
    }
  });

  const wrapper = mount(
    <BrowserRouter>
      <MealModal store={store} {...props} />
    </BrowserRouter>
  );

  return wrapper;
};

let wrapper = setup(false);

describe('MealModal Component', () => {
  const imageFile = new File(
    [''], 'filename.jpg',
    { type: 'image/jpeg' }
  );

  const mealObject = {
    name: 'Ugeli',
    desc: 'Nice Meal',
    type: 'Side',
    image: {
      file: imageFile
    }
  };

  const mealModalWrap = wrapper.find('MealModal');
  const mealModal = mealModalWrap.instance();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toEqual(1);
  });

  it('should call the onChange method', () => {
    const name = 'Ugeli';
    const desc = 'Meal Description';

    const event = {
      target: {
        name: 'name',
        value: name
      }
    };
    
    wrapper.find('[name="name"]').simulate('change', event);
    expect(mealModal.state.name).toBe(name);

    event.target.name = 'desc';
    event.target.value = desc;    
    wrapper.find('[name="desc"]').simulate('change', event);
    expect(mealModal.state.desc).toBe(desc);
  });

  it('call previewImage with invalid image', () => {
    mealModal.imageInput = {
      current: {
        files: [
          new File([''], 'filename.jpg', { type: "image/gif" })
        ]
      }
    };

    mealModal.previewImage();
    expect(mealModal.state.image.dataurl).toBe(null);
  });

  it('should call previewImage with valid image', () => {
    global.FileReader = class MockFileReader {
      constructor() {
        this.result = "data:url/to/image";

        this.readAsDataURL = () => {
          this.onload();
        };
      }
    };
    mealModal.imageInput = {
      current: {
        files: [imageFile]
      }
    };

    mealModal.previewImage();
    expect(mealModal.state.image.dataurl).toBe('data:url/to/image');
  });

  it('should call openFileDialog', () => {
    mealModal.imageInput = {
      current: {
        click: jest.fn()
      }
    };

    const spy = jest.spyOn(mealModal.imageInput.current, 'click');
    mealModal.openFileDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('should submit form with invalid details', () => {
    const form = wrapper.find('#add-meal-form');
    mealModal.state = mealObject;
    mealModal.state.name = '';
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(mealModal.props.errors.includes('name')).toBe(true);
  });

  it('should submit form with valid details', () => {
    const form = wrapper.find('#add-meal-form');
    mealModal.state.name = 'Ugeli';
    form.simulate('submit', { preventDefault: jest.fn() });
    expect(mealModal.state.name).toBe('Ugeli');
  });

  it('should call closeModal', () => {
    mealModal.closeModal();
    expect(mealModal.state.name).toBe('');
    expect(mealModal.state.type).toBe('');
    expect(mealModal.state.desc).toBe('');
  });

  it('should derive state from props if edit is true', () => {
    wrapper = setup(true);
  });
});
