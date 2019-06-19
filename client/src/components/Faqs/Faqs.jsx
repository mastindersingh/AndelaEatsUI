import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import FaqItem from './FaqItem';
import FaqModal from './FaqModal';
import DeleteModal from '../common/DeleteModal/DeleteModal';
import Loader from '../common/Loader/Loader';
import EmptyContent from '../common/EmptyContent';
import inputValidation from '../../helpers/inputValidation';

import {
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq
} from '../../actions/faqsAction';


const initialFaq = {
  question: '',
  answer: ''
};
/**
 * Class representing Faqs
 * 
 * @extends Component
 */
export class Faqs extends Component {
  state = {
    showModal: false,
    showDeleteModal: false,
    errors: {},
    faq: initialFaq
  };

  componentDidMount() {
    this.props.fetchFaqs();
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
  onChange = event => {
    const { name, value } = event.target;
    const oldFaq = { ...this.state.faq };
    oldFaq[name] = value;
    this.setState(prevState => ({
      faq: oldFaq,
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  };

  /**
   * 
   * @method faqFormIsValid
   * 
   * @memberof Users
   * 
   * @param {object} event
   * 
   * @returns {void}
   */
  faqFormIsValid = () => {
    const errorObject = {
      question: this.state.faq.question,
      answer: this.state.faq.answer
    };
    const err = inputValidation(errorObject);
    if (!err.isEmpty) {
      this.setState({ errors: err.errors });
      return false;
    }
    return true;
  }


  showFaqModal = (faq = initialFaq) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      faq,
      errors: {}
    }));
  };

  closeModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  }

  displayDeleteModal = (faq = initialFaq) => {
    this.setState(prevState => ({
      showDeleteModal: !prevState.showDeleteModal,
      faq
    }));
  };

  deleteFaqFunc = faq => {
    this.props.deleteFaq(faq).then(() => this.displayDeleteModal(faq));
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
        .then(() => this.showFaqModal());
    } else {
      this.props
        .createFaq({ ...faq, category: 'user_faq' })
        .then(() => this.showFaqModal());
    }
  };

  render() {
    const { faq: faqItem, showModal, errors } = this.state;
    const { 
      faqs,
      isLoading, 
      isAdmin,
    } = this.props;
    const header = (
      <div>
        {isAdmin ? (
          <span className="add-right" onClick={() => this.showFaqModal()}>
            Add Faq
          </span>
        ) : null}
        <h3 className="faq-head">Frequently Asked Questions</h3>
      </div>
    );

    const faqModal = (
      <FaqModal
        show={showModal}
        errors={errors}
        faq={faqItem}
        handleModal={this.showFaqModal}
        createFaq={this.props.createFaq}
        updateFaq={this.props.updateFaq}
        isLoading={this.props.isLoading}
        handleChange={this.onChange}
        handleSubmit={this.onSubmit}
        hideModal={this.closeModal}
      />
    );

    const faqDeleteModal = (
      <DeleteModal
        closeModal={this.displayDeleteModal}
        displayDeleteModal={this.state.showDeleteModal}
        item="FAQ"
        deleteItem={this.deleteFaqFunc}
        modalContent={this.state.faq}
        isDeleting={this.props.isLoading}
      />
    );
    let faqItems = faqs.map(faq => (
      <FaqItem
        key={faq.id}
        faq={faq}
        isAdmin={isAdmin}
        showFaqModal={this.showFaqModal}
        deleteFaq={this.deleteFaqFunc}
        showDeleteModal={this.displayDeleteModal}
      />
    ));
    if (!isLoading && faqs && faqs.length === 0) {
      faqItems = <EmptyContent message="No FAQ has been created" />;
    }

    return (
      <div>
        <ToastContainer />
        {header}
        {isLoading && <Loader />}
        {faqModal}
        {faqDeleteModal}
        {faqItems}
      </div>
    );
  }
}

Faqs.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    })
  ),
  isLoading: PropTypes.bool,
  deleteFaq: PropTypes.func.isRequired,
  fetchFaqs: PropTypes.func,
  isAdmin: PropTypes.number,
  createFaq: PropTypes.func.isRequired,
  updateFaq: PropTypes.func.isRequired
};

export const mapStateToProps = ({ faqsReducer, user }) => ({
  faqs: faqsReducer.faqs,
  isLoading: faqsReducer.isLoading,
  isAdmin: user.role
});

export default connect(
  mapStateToProps,
  {
    fetchFaqs,
    createFaq,
    updateFaq,
    deleteFaq
  }
)(Faqs);
