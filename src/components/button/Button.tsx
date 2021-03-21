import React, {CSSProperties} from "react";
import styles from "./button.module.css";

interface PropTypes {
  onClick?: () => void;
  kind?: "default" | "primary";
  type?: "button" | "submit" | "reset"
  color?: "white" | "blue" | "red" | "orange";
  disabled?: boolean
  style?: CSSProperties | undefined,
  form?: string
}

const Button: React.FC<PropTypes> = ({
  children,
  onClick,
  kind = "primary",
  type = "button",
  color = "blue",
  disabled = false,
  style = undefined,
  form= ""
}) => {
  return (
    <button
      form={form}
      style={style}
      disabled={disabled}
      type={type}
      className={[
        styles.button,
        kind === "primary" && styles[color],
        styles[type], !style && styles.sizes
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;