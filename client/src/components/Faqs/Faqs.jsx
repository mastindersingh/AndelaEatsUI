import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import FaqItem from "./FaqItem";
import FaqModal from './FaqModal';
import Loader from '../common/Loader/Loader';
import EmptyContent from '../common/EmptyContent';
import { 
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq 
} from "../../actions/faqsAction";

/**
 *
 *
 * @class Faqs
 *
 * @extends {Component}
 */
export class Faqs extends Component {
  state = {
    selectedFaq: null
  }

  componentDidMount() {
    // this.props.fetchFaqs();
  }

  showFaqModal = (faq) => {
    this.setState({
      showModal: true,
      selectedFaq: faq
    });
  }

  deleteFaqFunc = (faq) => {
    this.props.deleteFaq(faq.id);
  }

  render() {
    const { faqs, isLoading } = this.props;
    const header = (
      <div>
        <span className="add-right" onClick={() => this.showFaqModal(null)}>Add Faq</span>
        <h3 className="faq-head">Frequently Asked Questions</h3>
      </div>
    );

    const faqModal = (
      <FaqModal
        show={this.state.showModal}
        error={this.state.error}
        faq={this.state.selectedFaq}
        {...this.props}
      />
    );

    if (!isLoading && faqs && faqs.length === 0) {
      return (
        <div>
          { header }
          <EmptyContent message="No FAQ has been created" />
        </div>
      );
    }

    return (
      <div>
        { header }
        { isLoading && <Loader /> }
        { faqModal }
        { faqs.map(faq => <FaqItem key={faq.id} faq={faq} showFaqModal={this.showFaqModal} deleteFaq={this.deleteFaqFunc} />) }
      </div>
    );
  }
}

Faqs.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  })),
  isLoading: PropTypes.bool,
  fetchFaqs: PropTypes.func.isRequired,
  createFaq: PropTypes.func.isRequired,
  updateFaq: PropTypes.func.isRequired,
  deleteFaq: PropTypes.func.isRequired
};

const mapStateToProps = ({ faqsReducer }) => ({
  faqs: faqsReducer.faqs, 
  isLoading: faqsReducer.isLoading,
  isCreating: faqsReducer.isCreating,
  isUpdating: faqsReducer.isUpdating,
  isDeleting: faqsReducer.isDeleting
});

export default connect(mapStateToProps, 
  { 
    fetchFaqs,
    createFaq,
    updateFaq,
    deleteFaq
  })(Faqs);