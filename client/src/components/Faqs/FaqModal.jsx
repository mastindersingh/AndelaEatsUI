import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../common/Loader/Loader';

/**
 *
 *
 * @class FaqModal
 *
 * @extends {Component}
 */
class FaqModal extends Component {
  static initialState = {
    errors: [],
    faq: {
      question: '',
      answer: ''
    }
  };

  state = {
    ...FaqModal.initialState
  };

  /**
   * @param {Object} nextProps
   *
   * @returns {void}
   */
  componentWillReceiveProps = nextProps => {
    const newState = {
      faq:
        nextProps.faq && nextProps.faq.id !== this.state.faq.id
          ? nextProps.faq
          : FaqModal.initialState.faq
    };
    this.setState(newState);
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
    const oldFaq = { ...this.state.faq };
    oldFaq[name] = value;
    this.setState(preState => ({
      faq: oldFaq
    }));
  };

  faqFormIsValid = () => {
    let formIsValid = true;
    const errs = {};
    const { faq } = this.state;

    if (faq.question.length < 1) {
      errs.question = 'Field cannot be empty.';
      formIsValid = false;
    }

    if (faq.answer.length < 1) {
      errs.answer = 'Field cannot be empty.';
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

    if (!this.faqFormIsValid()) return;

    const { faq } = this.state;

    if (faq.id) {
      this.props
        .updateFaq(faq.id, faq)
        .then(() => this.props.handleModal(null));
    } else {
      this.props
        .createFaq({ ...faq, category: 'user_faq' })
        .then(() => this.props.handleModal(null));
    }
  };

  render() {
    const { faq, errors } = this.state;
    const { isCreating, isUpdating } = this.props;
    const isLoading = isCreating || isUpdating;
    return (
      <div
        className="modal"
        id="add-meal-modal"
        style={this.props.show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-content">
          {(isCreating || isUpdating) && <Loader />}
          <div className="modal-header">
            <div className="header-title">
              {faq && faq.id ? 'EDIT' : 'ADD'} FAQ
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

          <form id="add-faq-form" onSubmit={this.onSubmit}>
            <main>
              <div className="form-field-set">
                <label htmlFor="question">
                  Question
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
                  id="question"
                  type="text"
                  name="question"
                  value={faq && faq.question}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-field-set">
                <label htmlFor="answer">
                  Answer
                  <span
                    className="err-invalid"
                    style={{
                      display: errors.answer ? 'inline-block' : 'none'
                    }}
                  >
                    {' '}
                    * Invalid
                  </span>
                </label>
                <input
                  id="answer"
                  name="answer"
                  type="text"
                  value={faq && faq.answer}
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
              <button type="submit" disabled={isLoading}>
                {faq && faq.id ? 'Update' : 'Add'} FAQ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

FaqModal.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string
  }),
  show: PropTypes.bool,
  updateFaq: PropTypes.func.isRequired,
  createFaq: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  isUpdating: PropTypes.bool,
  handleModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default FaqModal;
