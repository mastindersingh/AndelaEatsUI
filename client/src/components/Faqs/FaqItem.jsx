import React, { Component, Fragment } from 'react';
import PropType from "prop-types";

const FaqItem = ({ faq, showFaqModal, deleteFaq }) => (
  <div className="wrap-collabsible">
    <span className="edit-right" onClick={ () => deleteFaq(faq)}><i className="fa-trash-alt fas" /></span>
    <span className="edit-right" onClick={ () => showFaqModal(faq)}><i className="fa-edit fas" /></span>
    <input id={`collapsible${faq.id}`} className="toggle" type="checkbox" />
    <label 
      htmlFor={`collapsible${faq.id}`} 
      className="lbl-toggle"
    > 
      {faq.question}
    </label>
    <div className="collapsible-content">
      <div className="content-inner">
        <p>
          {faq.answer}
        </p>
      </div>
    </div>
  </div>
);

FaqItem.propTypes = {
  faq: PropType.shape({
    question: PropType.string.isRequired,
    answer: PropType.string.isRequired
  }).isRequired,
  showFaqModal: PropType.func.isRequired,
  deleteFaq: PropType.func.isRequired
};

export default FaqItem;