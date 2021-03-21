import React from "react";
import styles from "./instruments.module.css";
import { InstrumentType } from "../../models/models";
import uprightPiano from "./../../assets/images/uprightPiano.svg";
import grandPiano from "./../../assets/images/grandPiano.svg";
import star from "./../../assets/images/star.svg";

interface PropTypes {
  instruments: Array<InstrumentType>;
  expanded?: boolean;
}

const Instruments: React.FC<PropTypes> = ({
  instruments,
  expanded = false,
}) => {
  if (instruments !== null)
    return (
      <ul
        className={[
          styles.instrumentsList,
          expanded ? styles.flexColumnAndRow : styles.flexRow,
        ].join(" ")}
      >
        {instruments.map((item) => (
          <li key={item.id} className={styles.instrumentItem}>
            <img
              className={styles.instrumentIcon}
              src={item.type === "UpRightPiano" ? uprightPiano : grandPiano}
              alt={
                item.type === "UpRightPiano" ? "up-right piano" : "grand piano"
              }
            />
            {expanded && (
              <>
                <p>{item.name}</p>
                <img className={styles.star} src={star} alt="star" />
              </>
            )}
            <p>{item.rate}</p>
          </li>
        ))}
      </ul>
    );
  return null;
};

export default Instruments;
