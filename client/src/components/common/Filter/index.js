import React from "react";
import {
  func, bool, object, oneOfType
} from 'prop-types';

const Filter = props => {
  const {
    handleFilterToggle,
    isOpen,
    handleFilterSubmit,
    handleClearFilter,
    renderFilterContent
  } = props;

  return (
    <div className="filter">
      <button
        className="button"
        name="filter-btn"
        type="button"
        onClick={handleFilterToggle}
      >
        <i className="fas fa-filter" />
          Filter
      </button>
      <form
        className={`dropdown ${isOpen && "active"}`}
      >

        {renderFilterContent()}

        <button
          className="submit-btn"
          type="button"
          onClick={handleFilterSubmit}
        >
          Submit
        </button>
        <div className="actions">
          <a
            className="action-item"
            role="button"
            tabIndex="0"
            onClick={handleClearFilter}
          >
            Clear filters
          </a>
          <a
            className="action-item"
            role="button"
            tabIndex="0"
            onClick={handleFilterToggle}
          >
            Close
          </a>
        </div>
      </form>
    </div>
  );
};

Filter.propTypes = {
  handleFilterToggle: func,
  isOpen: bool,
  handleFilterSubmit: func,
  handleClearFilter: func,
  renderFilterContent: func
};

export default Filter;
