import React from "react";
import styles from './filters.module.css';

type PropTypes = {
  onChange: (value: string) => void;
};

const Filters: React.FC<PropTypes> = ({onChange}) => {
  return <select className={styles.filters} onChange={(e)=>onChange(e.target.value)}>
      <option value="ALL">всі</option>
      <option value="FREE">вільні</option>
      <option value="SPECIAL">спеціалізовані</option>
  </select>
};

export default Filters;
