/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { func, array, bool } from 'prop-types';
import Select from 'react-select';
import ReactStars from 'react-stars';
import { formatDateToISOString } from '../../../helpers/dateFormatter';


/**
 *
 *
 * @class VendorRatingModal
 * @extends {Component}
 */
class VendorRatingModal extends Component {
  static initialState = () => ({
    selected: null,
    comment: '',
    rating: null,
    error: ''
  })

  constructor(props) {
    super(props);
    this.state = VendorRatingModal.initialState();
  }

  /**
   *
   * @method handleCloseModal
   *
   * @memberOf VendorRatingModal
   *
   * @returns {void}
   */
  handleCloseModal = () => {
    this.setState(VendorRatingModal.initialState());
    this.props.closeModal();
  }

  /**
   *
   * @method generateVendors
   *
   * @memberOf VendorRatingModal
   *
   * @returns {Array<T>}
   */
  generateVendors = () => {
    const { engagements } = this.props;
    let vendor = [];
    if (engagements && engagements.length) {
      vendor = engagements.map((item) => {
        const serviceDate = formatDateToISOString(item.startDate);
        return (
          {
            label: item.vendor.name,
            value: item.vendor.id,
            engagementId: item.id,
            serviceDate
          }
        );
      });
    }
    return vendor;
  }

  /**
 *
 * @method handleChange
 *
 * @param {Object} selected
 *
 * @memberOf VendorRatingModal
 *
 * @returns {void}
 */
  handleChange = (selected) => {
    this.removeErrorIcon('vendor');
    this.setState({ selected });
  }

  /**
 *
 * @method handleRatings
 *
 * @param {number} rating
 *
 * @memberOf VendorRatingModal
 *
 * @returns {void}
 */
  handleRatings = (rating) => {
    this.setState({ rating });
    this.removeErrorIcon('rating');
  }

  /**
 *
 * @method handleComment
 *
 * @param {object} event
 *
 * @memberOf VendorRatingModal
 *
 * @returns {void}
 */
  handleComment = ({ target: { value } }) => {
    this.setState({ comment: value });
    this.removeErrorIcon('comment');
  }

  /**
 *
 * @method handleError
 *
 * @param {string} error
 *
 * @memberOf VendorRatingModal
 *
 * @returns {void}
 */
  handleError = (error) => {
    this.setState({ error });
  }

  /**
 *
 * @method removeErrorIcon
 *
 * @param {string} error
 *
 * @memberOf VendorRatingModal
 *
 * @returns {void}
 */
  removeErrorIcon = (error) => {
    if (this.state.error === error) {
      this.setState({ error: '' });
    }
  }

  /**
 *
 * @method handleForm
 *
 * @param {object} event
 *
 * @memberOf VendorRatingModal
 *
 * @returns {void}
 */
  handleForm = (event) => {
    event.preventDefault();
    const { selected, comment, rating } = this.state;
    if (!selected) return this.handleError('vendor');
    if (!rating) return this.handleError('rating');
    if (!comment) return this.handleError('comment');
    const { value, engagementId, serviceDate } = selected;
    const data = {
      engagementId,
      comment,
      rating,
      serviceDate,
      vendorId: selected.value,
      channel: "web"
    };
    this.props.rateVendor(data);
    this.handleCloseModal();
  }

  /**
   *
   *
   *
   * @memberOf VendorRatingModal
   *
   * @returns {React.Node}
   */
  renderModalHeader = () => (
    <div className="modal-header">
      <div className="header-title">Rate Vendors</div>
      <div className="modal-close-button">
        <button
          type="button"
          title="close"
          tabIndex={0}
          className="btn-no-style"
          onClick={this.handleCloseModal}
        >
          <i className="fa fa-times close-btn" aria-hidden="true" />
        </button>
      </div>
    </div>
  )

  /**
 *
 *
 *
 * @memberOf VendorRatingModal
 *
 * @returns {React.Node}
 */
  renderSelect = () => {
    const { selected, error } = this.state;
    return (
      <div className="form-field-single">
        <Select
          onChange={this.handleChange}
          value={selected}
          options={this.generateVendors()}
          placeholder="Select a vendor"
        />
        {error === 'vendor' && (
          <i
            className="fa fa-exclamation-circle text-error"
            aria-hidden="true"
            title="required"
          />
        )}
      </div>
    );
  }

  /**
 *
 *
 *
 * @memberOf VendorRatingModal
 *
 * @returns {React.Node}
 */
  renderStars = () => {
    const { rating, error } = this.state;
    return (
      <div className="form-field-single modal-ratings">
        <ReactStars
          count={5}
          value={rating}
          onChange={this.handleRatings}
          size={24}
          color2="#ffd700"
        />
        {error === 'rating' && (
          <i
            className="fa fa-exclamation-circle text-error"
            aria-hidden="true"
            title="required"
          >
            &nbsp;Required
          </i>
        )}
      </div>
    );
  }

  /**
 *
 *
 *
 * @memberOf VendorRatingModal
 *
 * @returns {React.Node}
 */
  renderTextArea = () => {
    const { comment, error } = this.state;
    const borderColor = error === 'comment' ? 'bc-red' : 'bc-grey';
    return (
      <div className="comment-area">
        <div className="text">Leave a comment<span>*</span></div>
        <textarea
          className={`modal-comment ${borderColor}`}
          value={comment}
          onChange={this.handleComment}
          name="comment"
          maxLength="200"
        />
        {error === 'comment' && <small>Required</small>}
      </div>
    );
  }

  /**
 *
 *
 *
 * @memberOf VendorRatingModal
 *
 * @returns {React.Node}
 */
  renderFooter = () => (
    <div className="modal-footer">
      <div className="button-container">
        <button
          type="button"
          className="grayed"
          onClick={this.handleCloseModal}
        >
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </div>
  )

  render() {
    const display = this.props.displayModal ? 'block' : 'none';
    return (
      <div className="modal ratings-modal" style={{ display }}>
        <div className="modal-content">
          {this.renderModalHeader()}
          <div className="modal-body">
            <form onSubmit={this.handleForm}>
              {this.renderSelect()}
              {this.renderStars()}
              {this.renderTextArea()}
              {this.renderFooter()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

VendorRatingModal.propTypes = {
  closeModal: func,
  engagements: array,
  rateVendor: func,
  displayModal: bool,
};

export default VendorRatingModal;
