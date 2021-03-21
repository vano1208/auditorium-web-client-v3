import React from "react";
import styles from "./tag.module.css";
import Tooltip from "../tooltip/Tooltip";

interface PropTypes {
  body: string;
}

const Tag: React.FC<PropTypes> = ({ body }) => {
  const isMobileDevise = document.body.clientWidth < 1024;
  const bodyBrief = body
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  const bodyFull = body.toUpperCase();
  return (
    <div className={styles.tagContainer}>
      <Tooltip body={body}/>
      <p className={styles.tag}>{isMobileDevise ? bodyBrief : bodyFull}</p>
    </div>
  );
};

export default Tag;
