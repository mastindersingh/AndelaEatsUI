import React from 'react';
import PropTypes from 'prop-types';
import { setMealImage } from '../../../helpers/mealsHelper';

/**
 * @function MealCard
 * 
 * @param {object} { meal, showDeleteModal }
 * 
 * @returns {JSX}
 */
const MealCard = ({
  id,
  name,
  mealType,
  image,
  description,
  showDeleteModal,
  showEditModal,
}) => (
  <div className="meal-card">
    <div
      className="image"
      style={{ backgroundImage: `url(${setMealImage(image)})` }}
    />

    <div className="label-container">
      <span>{mealType}</span>
    </div>

    <div className="details">
      <div>{ name }</div>

      <div className="controls">
        <button
          className="edit-meal-item"
          type="button"
          onClick={() => {
            showEditModal({
              id, name, mealType, image, description
            }, true);
          }}
        >
        Edit
        </button>
        <button
          className="delete-meal-item"
          type="button"
          onClick={() => showDeleteModal({ id, name })}
        >
        Delete
        </button>
      </div>
    </div>
  </div>
);

MealCard.propTypes = {
  mealType: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  showDeleteModal: PropTypes.func,
  showEditModal: PropTypes.func,
};

export default MealCard;
