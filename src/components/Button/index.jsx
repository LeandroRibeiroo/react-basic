import propType from 'prop-types';

export const Button = ({ children, onButtonClick, disabled = false }) => {
  return (
    <button disabled={disabled} onClick={onButtonClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: propType.node.isRequired,
  onButtonClick: propType.func.isRequired,
  disabled: propType.bool,
};
