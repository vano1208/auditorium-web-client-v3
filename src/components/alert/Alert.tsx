import React, {useEffect, useState} from 'react';
import styles from './alert.module.css';

interface PT {
  body: string
  positionTop: number
}

const Alert: React.FC<PT> = ({body, positionTop}) => {
  const [className, setClassName] = useState([styles.alert, styles.mount].join(" "))
  useEffect(()=>{
      setTimeout(()=>{
        setClassName([styles.alert, styles.unmount].join(" "))
      }, 2000)
  },[])
  return <div className={className} style={{top: `${positionTop}px`}}>
    {body}
  </div>
}

export default Alert;