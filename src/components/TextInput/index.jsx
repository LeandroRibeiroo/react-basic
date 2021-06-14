import PropTypes from 'prop-types';

import './styles.css';

export const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input
      className="text-input"
      type="search"
      onChange={handleChange}
      value={searchValue}
      placeholder="Type your search..."
    ></input>
  );
};

TextInput.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
