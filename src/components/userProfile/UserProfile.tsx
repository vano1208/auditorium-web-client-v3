import React from "react";
import styles from "./userProfile.module.css";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../api/operations/queries/users";
import Title from "../title/Title";
import { userTypes, userTypesUa } from "../../models/models";
import Button from "../button/Button";

interface PropTypes {
  userId: number;
}

const UserProfile: React.FC<PropTypes> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: userId,
    },
  });
  if (!loading && !error)
    return (
      <div>
        <Title title="Персональний номер" />
        <p>{data.user.id}</p>
        <Title title="Статус" />
        <p>{userTypesUa[data.user.type as userTypes]}</p>
        <Title title="Кафедра" />
        <p>{data.user.department}</p>
        <Title title="E-mail" />
        <p>
          <Button>
            <a className={styles.link} href={`mailto:${data.user.email}`}>
              {data.user.email}
            </a>
          </Button>
        </p>
        <Title title="Телефон" />
        <p>
          <Button>
            <a className={styles.link} href={`tel:${data.user.phoneNumber}`}>
              {data.user.phoneNumber}
            </a>
          </Button>
        </p>
      </div>
    );
  return <p>Loading...</p>;
};

export default UserProfile;
