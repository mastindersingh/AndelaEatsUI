import React, { Component, Fragment } from 'react';
import PropType from "prop-types";

const FaqItem = ({ faq }) => {
  return (
    <div className="wrap-collabsible">
      <input id="collapsible" className="toggle" type="checkbox" />
      <div htmlFor="collapsible" className="lbl-toggle">{faq.question}</div>
      <div className="collapsible-content">
        <div className="content-inner">
          <p>
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

FaqItem.propTypes = {
  faq: PropType.shape({
    question: PropType.string.isRequired,
    answer: PropType.string.isRequired
  }).isRequired
};

export default FaqItem;