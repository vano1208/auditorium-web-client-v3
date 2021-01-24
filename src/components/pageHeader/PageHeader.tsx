import React from "react";
import styles from './header.module.css';

interface PropTypes {
  body: string
}

const PageHeader: React.FC<PropTypes> = ({body, children}) => {
  return <div className={styles.header}>{[body, children]}</div>
}

export default PageHeader;