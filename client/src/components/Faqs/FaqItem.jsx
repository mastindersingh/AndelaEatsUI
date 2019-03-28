import React from 'react';
import PropType from 'prop-types';

const FaqItem = ({ faq, showFaqModal, showDeleteModal, isAdmin }) => (
  <div className="wrap-collabsible">
    {isAdmin ? (
      <span className="edit-right" onClick={() => showDeleteModal(faq)}>
        <i className="fa-trash-alt fas" />
      </span>
    ) : null}
    {isAdmin ? (
      <span className="edit-right" onClick={() => showFaqModal(faq)}>
        <i className="fa-edit fas" />
      </span>
    ) : null}
    <input id={`collapsible${faq.id}`} className="toggle" type="checkbox" />
    <label htmlFor={`collapsible${faq.id}`} className="lbl-toggle">
      {faq.question}
    </label>
    <div className="collapsible-content">
      <div className="content-inner">
        <p>{faq.answer}</p>
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
  isAdmin: PropType.number,
  showDeleteModal: PropType.func
};

export default FaqItem;
