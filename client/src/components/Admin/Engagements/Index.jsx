import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import moment from 'moment';
import Loader from '../../common/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { EngagementCard } from './EngagementCard';
import DeleteModal from '../../common/DeleteModal/DeleteModal';
import Modal from '../../common/Modal';

import {
  fetchEngagements,
  fetchVendors,
  createEngagement,
  deleteEngagement,
  editEngagement
} from '../../../actions/admin/engagementsAction';
import EmptyContent from '../../common/EmptyContent';
import {
  formatDate,
  isStartgreaterThanEnd
} from '../../../helpers/formatMealItems';
import Input from '../../common/FormInputs';

/**
 * @class Engagements
 * @extends {Component}
 */
export class Engagements extends Component {
  state = {
    engagementId: '',
    startDate: moment(),
    endDate: moment().add(7, 'days'),
    selectedOption: {
      value: '',
      label: '',
      vendorId: 0
    },
    datePicker: moment(),
    displayModal: false,
    displayDeleteModal: false,
    modalContent: {},
    modalTitle: '',
    modalButtonText: ''
  };

  componentDidMount() {
    this.props.fetchEngagements();
    this.props.fetchVendors();
  }

  /**
   * Handles input fields text changes
   *
   * @params data, selectedOption
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  onChange = (data, selectedOption) => {
    this.setState({
      [selectedOption]: data
    });
  };

  /**
   * Handles form submission
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  handleSubmit = event => {
    event.preventDefault();
    const {
      engagementId,
      selectedOption,
      startDate,
      endDate,
      modalTitle
    } = this.state;

    const result = isStartgreaterThanEnd(startDate, endDate);

    if (result) {
      return toast.error(result);
    }

    if (selectedOption) {
      const engagement = {
        vendorId: selectedOption.vendorId,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      };
      if (modalTitle === 'ADD ENGAGEMENT') {
        if (selectedOption.vendorId !== 0) {
          this.props.createEngagement(engagement).then(() => this.closeModal());
        } else {
          toast.error('Vendor name is missing', {
            position: toast.POSITION.TOP_CENTER
          });
        }
      } else {
        this.props
          .editEngagement(engagementId, engagement)
          .then(() => this.closeModal());
      }
    }
  };

  /**
   *
   * @method showAddModal
   *
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  showAddModal = () => {
    this.setState({
      displayModal: true,
      modalTitle: 'ADD ENGAGEMENT',
      modalButtonText: 'Add Engagement'
    });
  };

  /**
   *
   * @method showEditModal
   *
   * @param {object} engagement
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  showEditModal = engagement => {
    const { id, vendor } = engagement;
    this.setState({
      engagementId: id,
      selectedOption: {
        value: vendor.name,
        label: vendor.name,
        vendorId: vendor.id
      },
      displayModal: true,
      modalTitle: 'EDIT ENGAGEMENT',
      modalButtonText: 'Update'
    });
  };

  /**
   *
   * @method deleteVendor
   *
   * @param {Object} vendorId
   *
   * @memberof vendors
   *
   * @returns {void}
   */
  deleteEngagement = engagementId => {
    this.props.deleteEngagement(engagementId).then(() => this.closeModal());
  };

  /**
   *
   * @method showDeleteModal
   *
   * @param {object} engagement
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  showDeleteModal = engagement => {
    this.setState({
      displayDeleteModal: true,
      modalContent: engagement
    });
  };

  /**
   *
   * @method closeModal
   *
   * @memberof Engagements
   *
   * @returns {void}
   */
  closeModal = () => {
    this.setState({
      displayModal: false,
      displayDeleteModal: false
    });
  };

  handleDisplayNoEdit = engagement => {
    const verifyDateRange = moment(engagement.endDate).isAfter(
      moment().toDate()
    );
    if (!verifyDateRange) {
      toast.error('Past Engagement cannot be edited');
    }
  };

  renderEngagements = engagements => {
    return engagements.map((engagement, key) => (
      <EngagementCard
        key={key}
        engagement={engagement}
        showDeleteModal={this.showDeleteModal}
        showEditModal={this.showEditModal}
        handleNoEdit={this.handleDisplayNoEdit}
      />
    ));
  };

  renderModalInputs = (vendorsResult) => (
      <div>
        <Input 
          type='select'
          id='vendorId'
          label='Vendor'
          value={this.state.selectedOption}
          onChangeHandler={(data) => this.onChange(data, "selectedOption")}
          options={vendorsResult}
          isRequired
        />
        <Input 
          type='date-picker'
          id='startDate'
          label='Start Date'
          value={this.state.startDate}
          onChangeHandler={(data) => this.onChange(data, "startDate")}
          name='start-date'
        />

        <Input 
          id='endDate'
          label='End Date'
          name='end-date'
          type='date-picker'
          value={this.state.endDate}
          onChangeHandler={(data) => this.onChange(data, "endDate")}
        />
      </div>
  );

  render() {
    const { isLoading, engagements, vendors, isDeleting } = this.props;
    const vendorsResult = vendors.map(result => ({
      value: result.name,
      label: result.name,
      vendorId: result.id
    }));

    const {
      displayModal,
      displayDeleteModal,
      modalContent,
      modalTitle,
      modalButtonText
    } = this.state;

    return (
      <Fragment>
        {isLoading  && <Loader />}
        <div className={`${isLoading && 'blurred'} table-wrapper`}>
          <div className="vendors-header">
            <h3 className="vendor-menu">Vendors Engagement</h3>
            <button
              type="button"
              name="addEngagement"
              className="engagement-button"
              onClick={this.showAddModal}
            >
              Add Engagements
            </button>
          </div>

          {engagements.length > 0 && (
            <div className="table-header custom-row">
              <div className="custom-col-4">Name</div>
              <div className="custom-col-3">Start Date</div>
              <div className="custom-col-3">End Date</div>
              <div className="custom-col-2">Options</div>
            </div>
          )}

          {engagements.length > 0 && this.renderEngagements(engagements)}

          {!isLoading && !engagements.length && (
            <EmptyContent message="No engagement has been added yet" />
          )}
        </div>
        <ToastContainer />
        
        <Modal
          modalButtonText={modalButtonText}
          formValidation={this.handleSubmit}
          closeModal={this.closeModal}
          modalTitle={modalTitle}
          displayModal={displayModal}
          children={this.renderModalInputs(vendorsResult)}
          
        />

        <DeleteModal
          isDeleting={isDeleting}
          deleteItem={this.deleteEngagement}
          displayDeleteModal={displayDeleteModal}
          closeModal={this.closeModal}
          modalContent={modalContent}
          item="Engagement"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ allEngagements }) => ({
  isLoading: allEngagements.isLoading,
  engagements: allEngagements.engagements,
  vendors: allEngagements.vendors
});

Engagements.propTypes = {
  fetchEngagements: PropType.func.isRequired,
  fetchVendors: PropType.func.isRequired,
  createEngagement: PropType.func.isRequired,
  deleteEngagement: PropType.func.isRequired,
  editEngagement: PropType.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    fetchEngagements,
    fetchVendors,
    createEngagement,
    deleteEngagement,
    editEngagement
  }
)(Engagements);
