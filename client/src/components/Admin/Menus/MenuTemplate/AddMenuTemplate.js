import React from 'react';
import {
  func, bool, object
} from 'prop-types';
import Modal from '../../../common/Modal';
import Input from '../../../common/FormInputs';

/**
 * @description AddMenuTemplate Component
 *
 * @func AddMenuTemplate
 *
 *  @param {object} props
 *
 * @returns {JSX}
 */
const AddMenuTemplate = (props) => {
  const {
    closeModal,
    displayModal,
    handleSubmit,
    handleChange,
    errors,
    isLoading
  } = props;
  const mealPeriod = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },

  ];

  /**
     * Renders modal content
     * @returns {JSX}
     */
  const renderContent = () => (
    <div className="children">
      <Input
        id="title"
        name="title"
        onChangeHandler={handleChange}
        error={errors && errors.name}
        label="Title"
        type="text"
        placeholder="Enter template title"
      />
      <div className="description">
        <label htmlFor="description">
          Description
          <span className="form-error">{errors && errors.description}</span>
        </label>
        <textarea
          type="text"
          name="description"
          placeholder="Enter template description..."
          onChange={handleChange}
        />
      </div>
      <Input
        id="meal-period"
        name="meal-period"
        onChangeHandler={handleChange}
        error={errors && errors.mealPeriod}
        label="Meal Period"
        type="select"
        options={mealPeriod}
        placeholder="Select location"
      />
    </div>
  );

  return (
    <React.Fragment>
      <div className="add-menu-template">
        <Modal
          closeModal={closeModal}
          formValidation={handleSubmit}
          displayModal={displayModal}
          modalButtonText="ADD TEMPLATE"
          modalTitle="Add Menu Template"
          loading={isLoading}
        >
          {renderContent()}
        </Modal>
      </div>
    </React.Fragment>
  );
};

AddMenuTemplate.propTypes = {
  closeModal: func.isRequired,
  displayModal: bool.isRequired,
  handleSubmit: func.isRequired,
  handleChange: func.isRequired,
  errors: object.isRequired,
  isLoading: bool.isRequired
};

export default AddMenuTemplate;
