import React from "react";
import styles from "./tag.module.css";

type PropTypes = {
  text: string;
  color: string;
};

const Tag: React.FC<PropTypes> = ({ text, color }) => {
  return (
    <span className={styles.tag} style={{ backgroundColor: color }}>
      {text}
    </span>
  );
};

export default Tag;
