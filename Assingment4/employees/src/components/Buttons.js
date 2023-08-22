import PropTypes from "prop-types";

const Buttons = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
         className="btn"
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Buttons;
