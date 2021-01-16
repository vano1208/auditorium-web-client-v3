import React from "react";
import errorImg from './../../assets/error.png';
import styles from './error.module.css';

interface PropTypes {
  errorMessage?: string
}

const Error: React.FC<PropTypes> = ({errorMessage = "Упс! Сталася помилка!"}) => {
  return <div>
    <img src={errorImg} alt="error" className={styles.errorImage}/>
    <h2 className={styles.errorMessage}>{errorMessage}</h2>
  </div>
}

export default Error;