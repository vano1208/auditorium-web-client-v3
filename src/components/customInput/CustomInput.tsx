import React from "react";
import styles from "./customInput.module.css";

interface PropTypes {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  type?: string;
  theme?: "dark" | "light";
}

const CustomInput: React.FC<PropTypes> = ({
  label,
  name,
  id,
  placeholder,
  type = "text",
  theme = "light",
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className={[styles.customLabel, styles[theme]].join(" ")}
      >
        {label}
      </label>
      <input
        name={name}
        id={id}
        className={[
          styles.customInput,
          theme === "light" ? styles.customInputLight : styles.customInputDark,
        ].join(" ")}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default CustomInput;
