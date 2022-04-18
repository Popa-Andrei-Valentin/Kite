const Button = ({ text }) => {
  return <button className="">{text}</button>;
};

Button.defaultProps = {
  text: `Add to favorites`,
};

export default Button;
