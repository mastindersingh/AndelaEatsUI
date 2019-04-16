import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../common/Loader/Loader';
import Modal from '../common/Modal/Modal';
import Input from '../common/Input/Input';

const faqModal = ({ 
  show, 
  handleChange, faq, errors,
  handleSubmit,
  isLoading,
  hideModal
}) => (
  <Modal 
    item="Faq" 
    show={show} 
    loading={isLoading} 
    hideModal={hideModal}
    handleSubmit={handleSubmit}
    content={faq}
  >
    {isLoading && <Loader />}
    <main>
      <Input
        id="question"
        name="question"
        value={(faq && faq.question)}
        onChange={handleChange}
        errorName={errors && errors.question}
        inputName="Question"
      />

      <Input
        id="answer"
        name="answer"
        value={(faq && faq.answer)}
        onChange={handleChange}
        errorName={errors && errors.answer}
        inputName="Answer"
      />
    </main>
  </Modal>
);

faqModal.propTypes = {
  faq: PropTypes.shape({
    id: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string
  }),
  show: PropTypes.bool,
  isLoading: PropTypes.bool,
  hideModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default faqModal;
