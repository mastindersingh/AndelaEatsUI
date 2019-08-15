import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { toastSuccess } from '../../../../helpers/toast';
import AddMenuTemplate from './AddMenuTemplate';
import inputValidation from '../../../../helpers/inputValidation';
import Button from '../../../common/Button/Button';
import { addMenuTemplate } from '../../../../actions/admin/menuTemplateAction';

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

  static getDerivedStateFromProps({ menuTemplate }, state) {
    if (menuTemplate.name === state.title) {
      return { displayModal: false };
    }
    return null;
  }

  /**
     * Handles closing a modal
     *
     * @returns {void}
     */
  closeModal= () => {
    this.setState({
      displayModal: false,
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
       title: '',
       description: '',
       mealPeriod: '',
       errors: {}
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

      this.setState({ isLoading: true });
      if (!err.isEmpty) {
        return this.setState({
          errors: err.errors,
          isLoading: false
        });
      }

      this.props.addMenuTemplate(data)
        .then(() => this.setState({ isLoading: false }));
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
          <ToastContainer />
        </React.Fragment>
      );
    }
}

const mapStateToProps = ({ menuTemplateReducer }) => ({
  menuTemplate: menuTemplateReducer.menuTemplate,
  error: menuTemplateReducer.error
});

const mapDispatchToProps = {
  addMenuTemplate
};

MenuTemplate.propTypes = {
  addMenuTemplate: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuTemplate);
