import React from "react";
import styles from "./tag.module.css";

type PropTypes = {
  text: string;
};

const Tag: React.FC<PropTypes> = ({ text }) => {
  return <span className={styles.tag}>{text}</span>;
};

export default Tag;
