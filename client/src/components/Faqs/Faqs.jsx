import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FaqItem from "./FaqItem";

import EmptyContent from '../common/EmptyContent';
import { fetchFaqs } from "../../actions/faqsAction";

/**
 * @description Faqs Component
 *
 * @name Faqs
 */
export class Faqs extends Component {
  componentDidMount() {
    this.props.fetchFaqs();
  }

  render() {
    const { faqs } = this.props;

    return (
      <div>
        <h3 className="faq-head">Frequently Asked Questions</h3>
        { faqs && faqs.length > 0
          ? faqs.map(faq => <FaqItem key={faq.id} faq={faq} />) 
          : <EmptyContent message="No FAQ has been created" />
        }
      </div>
    );
  }
}

Faqs.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  })),
  fetchFaqs: PropTypes.func.isRequired,
};

const mapStateToProps = ({ faqsReducer }) => ({
  faqs: faqsReducer.faqs, 
  isLoading: faqsReducer.isLoading
});

export default connect(mapStateToProps, { fetchFaqs })(Faqs);