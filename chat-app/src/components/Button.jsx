const Button = ({ onClick, text, icon, className }) => {
  return (
    <button type="button" className={className} onClick={onClick}>
       {text}{icon}
    </button>
  );
};

Button.defaultProps = {
  text: "Button",
  className: "fixed-btn primary",
};

export default Button;