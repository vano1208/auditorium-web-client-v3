import React from "react";
import styles from "./button.module.css";

type PropTypes = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset"
  disabled?: boolean
};

const Button: React.FC<PropTypes> = ({ children, onClick = ()=>null, type = "button", disabled = false}) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
