import React from "react";
import musicNotesIcon from './../../assets/musicNotes.svg';
import styles from './loading.module.css';

interface PropTypes {

}

const Loading: React.FC<PropTypes> = ({}) => {
  return <div><img src={musicNotesIcon} alt="loading" className={styles.heartbeat}/>
  <h2 className={styles.loadingMessage}>Завантаження даних. Будь ласка, зачекайте...</h2>
  </div>
}

export default Loading;