import React from "react";
import {
  User,
  userTypes,
  userTypesUa,
} from "../../models/models";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../api/operations/queries/users";
import styles from "./users.module.css";

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <div className={styles.users}>
      <div className={styles.usersHeader}>Користувачі</div>
      <ul>
        <li className={[styles.usersUnitList, styles.listHeader].join(" ")}>
          <div>ID</div>
          <div>П.І.Б.</div>
          <div>Статус</div>
        </li>
        {data.users.map((user: User) => (
          <li key={user.id} className={styles.usersUnitList}>
              <div>
                  {user.id}
              </div>
            <div>
              {[user.lastName, user.firstName, user.patronymic].join(" ")}
            </div>
            <div>{userTypesUa[user.type as userTypes]}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
