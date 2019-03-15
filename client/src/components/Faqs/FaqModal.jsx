import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

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
    show: false,
    faq: { 
      question: "",
      answer: ""
    },
    isLoading: false
  };

  state = {
    ...FaqModal.initialState
  }
  
  componentWillReceiveProps = (nextProps) => {
    const newState = {
      show: nextProps.show,
      faq: nextProps.faq && nextProps.faq.id !== this.state.faq.id 
        ? nextProps.faq : FaqModal.initialState.faq
    };
    this.setState(newState);
  }

  closeModal = () => {
    this.setState({
      ...FaqModal.initialState
    });
  }

  /**
   *
   *
   * @description handle onChage event
   * 
   * @param { Object } event
   * 
   * @returns { undefined }
   */
  onChange = (event) => {
    const { name, value } = event.target;
    const oldFaq = this.state.faq;
    oldFaq[name] = value;
    this.setState({ 
      faq: oldFaq,
    });
  }

  faqFormIsValid =() => {
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
  }

  /**
   *
   * @description handle onSubmit event
   * 
   * @param { Object } event
   * 
   * @returns { undefined }
   */
  onSubmit = (event) => {
    event.preventDefault();

    if (!this.faqFormIsValid()) return;

    const { faq } = this.state;

    if (faq.id) {
      this.props.updateFaq(faq.id, faq).then(() => this.closeModal());
    } else {
      this.props.createFaq(faq).then(() => this.closeModal());
    }
  }

  render() {
    const {
      faq,
      show,
      errors,
      isLoading
    } = this.state;

    return (
      <div
        className="modal"
        id="add-meal-modal"
        style={show ? { display: 'block' } : { display: 'none' }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-title">{ faq && faq.id ? 'EDIT' : 'ADD'} FAQ</div>
            <div className="main">
              <button
                tabIndex={0}
                type="button"
                className="close-icon btn-no-style"
                onClick={() => this.closeModal()}
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
                      display: errors.question
                        ? 'inline-block'
                        : 'none'
                    }}
                  > * Invalid
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
                      display: errors.answer
                        ? 'inline-block'
                        : 'none'
                    }}
                  > * Invalid
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
              <div>
                <div
                  className="loader-wheel"
                  style={{ display: isLoading ? 'inline-block' : 'none' }}
                />
              </div>

              <button
                type="button"
                className="grayed"
                onClick={this.closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
              >
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
  errors: PropTypes.arrayOf(PropTypes.string),
  faq: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string
  }),
  show: PropTypes.bool,
  isLoading: PropTypes.bool,
  updateFaq: PropTypes.func.isRequired,
  createFaq: PropTypes.func.isRequired,
};

export default FaqModal;
