import React from "react";
import styles from "./occupantInfo.module.css";
import {
  OccupiedInfo,
  User,
  userTypes,
  userTypesUa,
} from "../../../models/models";
import Title from "../../title/Title";
import { fullName, getTimeHHMM, typeStyle } from "../../../helpers/helpers";
import { usePopupWindow } from "../../popupWindow/PopupWindowProvider";
import UserProfile from "../../userProfile/UserProfile";

interface PropTypes {
  occupied: OccupiedInfo | null;
}

const OccupantInfo: React.FC<PropTypes> = ({ occupied }) => {
  const dispatchPopupWindow = usePopupWindow();
  const onClick = () => {
    dispatchPopupWindow({
      header: <h1>{fullName(occupied?.user)}</h1>,
      body: <UserProfile userId={occupied?.user.id as number} />,
    });
  };
  return (
    <>
      <Title title="Ким зайнято" />
      <div onClick={onClick} className={styles.occupantCard}>
        <div className={styles.occupantName}>
          <div className={styles.icon} />
          <p>{fullName(occupied?.user)}</p>
        </div>
        <p
          style={typeStyle(occupied as OccupiedInfo)}
          className={styles.occupantType}
        >
          {userTypesUa[occupied?.user.type as userTypes]}
        </p>
        <p className={styles.occupiedUntil}>
          Зайнято до {getTimeHHMM(new Date((occupied as OccupiedInfo).until))}
        </p>
      </div>
    </>
  );
};

export default OccupantInfo;
