import React from "react";
import styles from "./button.module.css";

type PropTypes = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  style?: {}
};

const Button: React.FC<PropTypes> = ({ children, onClick = ()=>null, type = "button", disabled = false, style}) => {
  return (
    <button style={style} disabled={disabled} type={type} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
