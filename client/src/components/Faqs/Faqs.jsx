import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import FaqItem from './FaqItem';
import FaqModal from './FaqModal';
import DeleteModal from '../common/DeleteModal/DeleteModal';
import Loader from '../common/Loader/Loader';
import EmptyContent from '../common/EmptyContent';

import {
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq
} from '../../actions/faqsAction';

/**
 * @class Faqs
 *
 * @extends {Component}
 */
export class Faqs extends Component {
  state = {
    selectedFaq: null,
    showModal: false,
    showDeleteModal: false
  };

  componentDidMount() {
    this.props.fetchFaqs();
  }

  showFaqModal = faq => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedFaq: faq
    }));
  };

  displayDeleteModal = faq => {
    this.setState(prevState => ({
      showDeleteModal: !prevState.showDeleteModal,
      selectedFaq: faq
    }));
  };

  deleteFaqFunc = faq => {
    this.props.deleteFaq(faq).then(() => this.displayDeleteModal(null));
  };

  render() {
    const { faqs, isLoading, isAdmin, isCreating } = this.props;
    const header = (
      <div>
        {isAdmin ? (
          <span className="add-right" onClick={() => this.showFaqModal(null)}>
            Add Faq
          </span>
        ) : null}
        <h3 className="faq-head">Frequently Asked Questions</h3>
      </div>
    );

    const faqModal = (
      <FaqModal
        show={this.state.showModal}
        error={this.state.error}
        faq={this.state.selectedFaq}
        handleModal={this.showFaqModal}
        isCreating={this.props.isCreating}
        isUpdating={this.props.isUpdating}
        createFaq={this.props.createFaq}
        updateFaq={this.props.updateFaq}
        isLoading={this.props.isLoading}
      />
    );

    const faqDeleteModal = (
      <DeleteModal
        closeModal={this.displayDeleteModal}
        displayDeleteModal={this.state.showDeleteModal}
        item="FAQ"
        deleteItem={this.deleteFaqFunc}
        modalContent={this.state.selectedFaq}
        isDeleting={this.props.isDeleting}
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
        {(isLoading || isCreating) && <Loader />}
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
  isCreating: PropTypes.bool,
  fetchFaqs: PropTypes.func,
  isDeleting: PropTypes.bool,
  isAdmin: PropTypes.number,
  isUpdating: PropTypes.bool,
  createFaq: PropTypes.func.isRequired,
  updateFaq: PropTypes.func.isRequired
};

export const mapStateToProps = ({ faqsReducer, user }) => ({
  faqs: faqsReducer.faqs,
  isLoading: faqsReducer.isLoading,
  isCreating: faqsReducer.isCreating,
  isUpdating: faqsReducer.isUpdating,
  isDeleting: faqsReducer.isDeleting,
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
