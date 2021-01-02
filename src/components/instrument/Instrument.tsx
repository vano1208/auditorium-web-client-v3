import React from "react";
import styles from "./instrument.module.css";
import grandPiano from './../../assets/grandPiano.png';
import uprightPiano from './../../assets/uprightPiano.png'
import {InstrumentType} from "../../models/models";

type PropTypes = {
  instrument: InstrumentType;
  withName?: boolean;
};

const Instrument: React.FC<PropTypes> = ({ instrument , withName = false}) => {
  return <div key={instrument.id} className={styles.instrument}>{
      <img src={instrument.type==="UpRightPiano"?uprightPiano:grandPiano} alt={instrument.type}/>
  }<div>{withName?<span>{instrument.name} </span>:null}{instrument.rate}</div></div>;
};

export default Instrument;
