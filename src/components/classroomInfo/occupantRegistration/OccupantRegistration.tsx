import React, {FormEvent, useEffect, useState,} from "react";
import styles from "./occupantRegistration.module.css";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../../../api/operations/queries/users";
import {fullName} from "../../../helpers/helpers";
import Title from "../../title/Title";
import Select from 'react-select';
import {User, userTypesUa, userTypes} from "../../../models/models";

interface PropTypes {
  dispatchNotification: (value: string) => void;
}

const OccupantRegistration: React.FC<PropTypes> = ({dispatchNotification}) => {
  const [value, setValue] = useState();
  const [chosenUser, setChosenUser] = useState("");
  const [chosenUserType, setChosenUserType] = useState(userTypes.STUDENT);
  const [chosenUserName, setChosenUserName] = useState("");
  const {data, loading, error} = useQuery(GET_USERS);
  const [users, setUsers] = useState();
  const newUserTypes: any = [
    {value: userTypes.STUDENT, label: userTypesUa.STUDENT},
    {value: userTypes.POST_GRADUATE, label: userTypesUa.POST_GRADUATE}
  ];

  useEffect(() => {
    if (!loading && !error) {
      setUsers(data.users.map((user: User) => ({label: user.id + ": " + fullName(user), value: user.id})));
    }
  }, [data]);

  const handleChange = (e: any) => {
    console.log('chosen user: ', e.value);
    setChosenUserName(fullName((data.users as unknown as Array<User>).find(user => user.id === e.value)));
  };

  const handleChangeNewUser = (e: any) => {
    setValue(e.target.value);
    setChosenUserName(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatchNotification(value);
  };

  return (
    <div>
      <form
        id="userSearchForm"
        className={styles.userSearch}
        onSubmit={handleSubmit}
      >
          <Select
            placeholder="Пошук серед існуючих користувачів"
            options={users}
            styles={{menuPortal: base => ({...base, zIndex: 9999})}}
            menuPortalTarget={document.body}
            onChange={handleChange}
          />
        <div>
            <input
              type="text"
              value={value}
              onChange={handleChangeNewUser}
              name="tempUsersInput"
              id="tempUsersInput"
              placeholder="Новий користувач"
              className={styles.createUserInput}
              autoComplete="off"
            />
          {value && <Select
            options={newUserTypes}
            // defaultValue={userTypes.STUDENT}
            placeholder={userTypesUa.STUDENT}
          />}
        </div>
      </form>
      <Title title="Вибраний користувач"/>
      <p>{chosenUserName}</p>
    </div>
  );
};

export default OccupantRegistration;