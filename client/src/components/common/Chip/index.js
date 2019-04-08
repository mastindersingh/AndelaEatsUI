import React from 'react';
import PropTypes from 'prop-types';

const Chips = ({ name, deleteItem, id }) => (
  <div className="chip">
    { name }
    <span className="closebtn" onClick={() => deleteItem(id)}>&times;</span>
  </div>
);

Chips.propTypes = {
  deleteItem: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.number
};
  
export default Chips;