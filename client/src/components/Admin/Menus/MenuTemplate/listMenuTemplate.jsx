import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplateRow from './TemplateRow';
import Loader from '../../../common/Loader/Loader';
import { getMenuTemplates, deleteMenuTemplate } from '../../../../actions/admin/menuTemplateAction';
import DeleteModal from '../../../common/DeleteModal/DeleteModal';

export class ListMenuTemplate extends Component {
  state = {
    displayDeleteMenuTemplateModal: false,
    isDeleteMenuTemplateLoading: false,
    modalContent: undefined
  }

  componentDidMount() {
    this.getMenuTemplates();
  }

  getMenuTemplates = () => {
    this.props.getMenuTemplates()
      .then(() => { }).catch(() => { });
  }

  renderMenuTemplates = menuTemplates => {
    return menuTemplates.map(menuTemplate => (
      <TemplateRow
        key={menuTemplate.id}
        templateDetails={menuTemplate}
        openDeleteMenuTemplateModal={this.openDeleteMenuTemplateModal}
        editModalOpen={this.props.openEditModal}
    />
    ));
  }

  /**
     * Handles opening delete menu template modal
     *
     * @returns {void}
     */
  openDeleteMenuTemplateModal = async (id) => {
    await this.setState({
      modalContent: { id },
      displayDeleteMenuTemplateModal: true
    });
  }

  /**
    * Handles closing delete menu template modal
    *
    * @returns {void}
    */
  closeDeleteMenuTemplateModal = () => {
    this.setState({
      displayDeleteMenuTemplateModal: false
    });
  }

  /**
    * Handles deleting a menu template
    *
    * @returns {void}
    */
  deleteMenuTemplate = async (id) => {
    this.setState({ isDeleteMenuTemplateLoading: true });

    this.props.deleteMenuTemplate(id)
      .then(() => this.setState({
        isDeleteMenuTemplateLoading: false,
        displayDeleteMenuTemplateModal: false
      }))
        .then(() => this.getMenuTemplates());
  }

  render() {
    const { menuTemplates, isLoading } = this.props.menuTemplates;
    const {
      displayDeleteMenuTemplateModal,
      isDeleteMenuTemplateLoading,
      modalContent
    } = this.state;
    return (
      <React.Fragment>
        {isLoading && <Loader />}
        <div className={`${isLoading && 'blurred'}`} id="table-wrapper">
          {menuTemplates.length > 0 && (
            <div id="menu-template-table-header">
              <div className="custom-col-2">Name</div>
              <div className="custom-col-2">Meal period</div>
              <div className="custom-col-5">Description</div>
              <div className="custom-col-3">Options</div>
            </div>
          )}
          {menuTemplates.length > 0 && this.renderMenuTemplates(menuTemplates)}
          {!isLoading && !menuTemplates.length && (
            <EmptyContent message="No menu template has been created yet" />
          )}

          {displayDeleteMenuTemplateModal
            && (
              <DeleteModal
                closeModal={this.closeDeleteMenuTemplateModal}
                isDeleting={isDeleteMenuTemplateLoading}
                displayDeleteModal={displayDeleteMenuTemplateModal}
                deleteItem={this.deleteMenuTemplate}
                modalContent={modalContent}
                item={'menu template'}
              />
            )}
        </div>
        </React.Fragment>
    );
  }
};

export const mapStateToProps = ({ menuTemplates }) => ({ menuTemplates });

const mapDispatchToProps = {
  getMenuTemplates,
  deleteMenuTemplate
};

export default connect(mapStateToProps, mapDispatchToProps)(ListMenuTemplate);
