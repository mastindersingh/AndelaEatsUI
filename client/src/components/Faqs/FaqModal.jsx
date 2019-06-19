import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../common/Loader/Loader';
import Modal from '../common/Modal';
import Input from '../common/FormInputs';

const faqModal = ({ 
  show, 
  handleChange, faq, errors,
  handleSubmit,
  isLoading,
  hideModal
}) => (
  <Modal 
    modalButtonText={!faq.id ? "Add Faq" : 'Update Faq'}
    modalTitle={!faq.id ? 'Add Faq' : 'Edit Faq'}
    displayModal={show}
    isCreating={isLoading}
    isUpdating={isLoading} 
    closeModal={hideModal}
    formValidation={handleSubmit}
  >
    <main>
      <Input
        id="question"
        name="question"
        value={(faq && faq.question)}
        onChangeHandler={handleChange}
        error={errors && errors.question}
        label="Question"
      />

      <Input
        id="answer"
        name="answer"
        value={(faq && faq.answer)}
        onChangeHandler={handleChange}
        error={errors && errors.answer}
        label="Answer"
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
