import React, {ReactFragment} from "react";
import styles from "./title.module.css";

interface PropTypes {
  title: ReactFragment | string;
}

const Title: React.FC<PropTypes> = ({ title }) => {
  return (
    <div className={styles.title}>
      <p>{title}</p>
    </div>
  );
};

export default Title;
