import React from 'react';
import styles from './popupWindow.module.css';

interface PropTypes {
  headerBody: any
  onClose: (value: string) => void
  visibility: string
}

const PopupWindow: React.FC<PropTypes> = ({onClose, visibility, headerBody, children}) => {
  return <div
    className={styles.modal}
    style={{display: visibility}}
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose("none");
      }
    }}
  >
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
          <span onClick={() => onClose("none")} className={styles.close}>
            &times;
          </span>
        <h2>
          {headerBody}
        </h2>
      </div>
      <div className={styles.modalBody}>
        {children}
      </div>

    </div>
  </div>
}

export default PopupWindow;