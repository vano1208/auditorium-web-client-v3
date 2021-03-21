import React from "react";
import styles from "./tooltip.module.css";

interface PropTypes {
  body: string;
}

const Tooltip: React.FC<PropTypes> = ({ body }) => {
  return <div className={styles.tooltip}>{body}</div>;
};

export default Tooltip;
