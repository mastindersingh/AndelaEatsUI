import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrixEditor } from 'react-trix';

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
      
      if (this.state.textEditor) {
        this.state.textEditor.insertHTML(nextProps.about.details);
      }
    }
  };

  /**
   *
   *
   * @description handle Editor Ready event
   *
   * @param { Object } editor
   *
   * @returns { undefined }
   */
  handleEditorReady = editor => {
    this.setState({ textEditor: editor });
  };

  /**
   *
   *
   * @description handle onChage event
   *
   * @param { String } value
   *
   * @returns { undefined }
   */
  onChange = value => {
    this.setState(preState => ({
      about: {
        ...preState.about,
        details: value
      }
    }));
  };

  aboutFormIsValid = () => {
    let formIsValid = true;
    const errs = {};
    const { about } = this.state;

    if (about.details.length < 1) {
      errs.details = 'Field cannot be empty.';
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
        id="trix-modal"
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
                      display: errors.details ? 'inline-block' : 'none'
                    }}
                  >
                    {' '}
                    * Invalid
                  </span>
                </label>
                <TrixEditor
                  id="details"
                  name="details"
                  onChange={this.onChange}
                  value={about && about.details}
                  onEditorReady={this.handleEditorReady}
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

// setting the types
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
