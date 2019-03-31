import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../common/Loader/Loader';

/**
 *
 *
 * @class AboutModal
 *
 * @extends {Component}
 */
class AboutModal extends Component {
  static initialState = {
    errors: [],
    about: {
      details: ''
    }
  };

  state = {
    ...AboutModal.initialState
  };

  /**
   * @param {Object} nextProps
   *
   * @returns {void}
   */
  componentWillReceiveProps = nextProps => {
    if (nextProps.about && nextProps.about.id !== this.state.about.id) {
      this.setState({ about: nextProps.about });
    }
  };

  /**
   *
   *
   * @description handle onChage event
   *
   * @param { Object } event
   *
   * @returns { undefined }
   */
  onChange = event => {
    const { name, value } = event.target;
    const oldAbout = { ...this.state.about };
    oldAbout[name] = value;
    this.setState(preState => ({
      about: oldAbout
    }));
  };

  aboutFormIsValid = () => {
    let formIsValid = true;
    const errs = {};
    const { about } = this.state;

    if (about.details.length < 1) {
      errs.question = 'Field cannot be empty.';
      formIsValid = false;
    }

    this.setState({ errors: errs });
    return formIsValid;
  };

  /**
   *
   * @description handle onSubmit event
   *
   * @param { Object } event
   *
   * @returns { undefined }
   */
  onSubmit = event => {
    event.preventDefault();

    if (!this.aboutFormIsValid()) return;

    const { about } = this.state;
    this.props
      .updateAbout(about)
      .then(() => this.props.handleModal(null));
  };

  render() {
    const { about, errors } = this.state;
    const { isUpdating } = this.props;
    return (
      <div
        className="modal"
        id="add-meal-modal"
        style={this.props.show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-content">
          {(isUpdating) && <Loader />}
          <div className="modal-header">
            <div className="header-title">
              {about && about.id ? 'EDIT' : 'ADD'} ABOUT
            </div>
            <div className="main">
              <button
                tabIndex={0}
                type="button"
                className="close-icon btn-no-style"
                onClick={() => this.props.handleModal(null)}
              >
                X&nbsp;&nbsp;Close
              </button>
            </div>
          </div>

          <form id="add-about-form" onSubmit={this.onSubmit}>
            <main>
              <div className="form-field-set">
                <label htmlFor="details">
                  Details
                  <span
                    className="err-invalid"
                    style={{
                      display: errors.question ? 'inline-block' : 'none'
                    }}
                  >
                    {' '}
                    * Invalid
                  </span>
                </label>
                <input
                  id="details"
                  type="text"
                  name="details"
                  value={about && about.details}
                  onChange={this.onChange}
                />
              </div>
            </main>

            <div className="modal-footer">
              <button
                type="button"
                className="grayed"
                onClick={() => this.props.handleModal(null)}
              >
                Cancel
              </button>
              <button type="submit" disabled={isUpdating}>
                {about && about.id ? 'Update' : 'Add'} About
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AboutModal.propTypes = {
  about: PropTypes.shape({
    id: PropTypes.number,
    details: PropTypes.string
  }),
  show: PropTypes.bool,
  updateAbout: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
  handleModal: PropTypes.func.isRequired
};

export default AboutModal;
