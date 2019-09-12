import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { toastSuccess } from '../../../../helpers/toast';
import AddMenuTemplate from './AddMenuTemplate';
import inputValidation from '../../../../helpers/inputValidation';
import Button from '../../../common/Button/Button';
import ListMenuTemplates from './listMenuTemplate';
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
    errors: {},
    modalTitle: '',
    modalButtonText: ''

  }

  static getDerivedStateFromProps({ menuTemplates }, state) {
    if ((menuTemplates.length) && (menuTemplates[0].name === state.title)) {
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
      modalButtonText: '',
      modalTitle: ''
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
       errors: {},
       modalButtonText: 'ADD',
       modalTitle: 'Add',
     });
   }

   /**
     * Handles opening the Edit modal
     *
     * @returns {void}
     */
   openEditModal = () => {
     this.setState({
       displayModal: true,
       title: 'ddd',
       description: 'fff',
       mealPeriod: 'dd',
       errors: {},
       modalButtonText: 'EDIT',
       modalTitle: 'Edit',
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
      const {
        displayModal,
        errors,
        isLoading,
        modalTitle,
        modalButtonText,
        title,
        description,
        mealPeriod
      } = this.state;
      return (
        <React.Fragment>
          <div id="menu-template">
            <div className={`${isLoading && 'blurred'}`} id="table-wrapper">
            <div id="menu-template-header">
              <h3 id="menu-template-title">Menu Template</h3>
              <div id="template-buttons">
                <div className="menu-template">
                  <Button
                    classes="btn"
                    onClickHandler={this.openModal}
                    loading={isLoading}
                    name="add-btn"
                    btnText="Create"
                  />
                  {displayModal
            && (
              <AddMenuTemplate
                closeModal={this.closeModal}
                displayModal={displayModal}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                errors={errors}
                isLoading={isLoading}
                modalTitle={modalTitle}
                modalButtonText={modalButtonText}
                title={title}
                description={description}
                mealPeriodValue={mealPeriod}
              />
            )}
                </div>    
                <button className="menu-template-header-buttons" type="button">
                Filter
                </button>
                <button className="menu-template-header-buttons" type="button">
                Copy
                </button>
              </div>
            </div>
            <ListMenuTemplates openEditModal={this.openEditModal} />
            {/* </div> */}
          </div>
          </div>
          {/* </div> */}
          <ToastContainer />
        </React.Fragment>
      );
    }
}

const mapStateToProps = ({ menuTemplates }) => ({
  menuTemplates: menuTemplates.menuTemplates,
  error: menuTemplates.error
});

const mapDispatchToProps = {
  addMenuTemplate,
};

MenuTemplate.propTypes = {
  addMenuTemplate: func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuTemplate);
