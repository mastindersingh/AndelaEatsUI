import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FaqItem from "./FaqItem";


import Loader from '../common/Loader/Loader';
import EmptyContent from '../common/EmptyContent';
import { fetchFaqs } from "../../actions/faqsAction";

/**
 * @description Faqs Component
 *
 * @name Faqs
 */
export class Faqs extends Component {
  componentDidMount() {
    // this.props.fetchFaqs();
  }

  render() {
    const { faqs, isLoading } = this.props;
    const header = <h3 className="faq-head">Frequently Asked Questions</h3>;

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
        { faqs.map(faq => <FaqItem key={faq.id} faq={faq} />) }
      </div>
    );
  }
}

Faqs.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  })),
  isLoading: PropTypes.bool.isRequired,
  fetchFaqs: PropTypes.func.isRequired,
};

const mapStateToProps = ({ faqsReducer }) => ({
  faqs: faqsReducer.faqs, 
  isLoading: faqsReducer.isLoading
});

export default connect(mapStateToProps, { fetchFaqs })(Faqs);