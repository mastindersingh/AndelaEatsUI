import React, { Component } from 'react';
import AddMenuTemplate from './AddMenuTemplate';
import inputValidation from '../../../../helpers/inputValidation';
import Button from '../../../common/Button/Button';

/**
 *
 * @description MenuTemplate Component
 *
 * @class MenuTemplate
 * @extends Component
 */
export class MenuTemplate extends Component {
  state={
    displayModal: false,
    title: '',
    description: '',
    mealPeriod: '',
    isLoading: false,
    errors: {}
  }

  /**
     * Handles closing a modal
     *
     * @returns {void}
     */
  closeModal= () => {
    this.setState({
      displayModal: false,
      errors: {}
    });
  }

  /**
     * Handles opening a modal
     *
     * @returns {void}
     */
   openModal= () => {
     this.setState({
       displayModal: true,
     });
   }

   /**
     * Handles change
     *
     * @param {object} event
     *
     * @returns {void}
     */
    handleChange = (event) => {
      if (event.value) {
        return this.setState({ mealPeriod: event.value });
      }

      const { value, name } = event.target;

      this.setState({ [name]: value });
    };

    /**
     * Handles form submission
     * @returns {void}
     */
    handleSubmit = () => {
      const {
        title,
        description,
        mealPeriod
      } = this.state;
      const data = {
        name: title,
        description,
        mealPeriod
      };
      const err = inputValidation(data);

      if (!err.isEmpty) {
        return this.setState({ errors: err.errors });
      }
    };

    render() {
      const { displayModal, errors, isLoading } = this.state;

      return (
        <React.Fragment>
          <div className="menu-template">
            <div className="header">
              <span className="heading"> Menu Templates </span>
              <Button
                classes="btn"
                onClickHandler={this.openModal}
                loading={isLoading}
                name="add-btn"
                btnText="Create"
              />
            </div>
            {displayModal
            && (
            <AddMenuTemplate
              closeModal={this.closeModal}
              displayModal={displayModal}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              errors={errors}
              isLoading={isLoading}
            />
            )}
          </div>
        </React.Fragment>
      );
    }
}

export default MenuTemplate;
