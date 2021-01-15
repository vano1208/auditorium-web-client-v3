import React from 'react';
import styles from './profile.module.css';
import PageHeader from "../pageHeader/PageHeader";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../../api/operations/queries/users";
import {User, userTypes, userTypesUa} from "../../models/models";
import Loading from "../loading/Loading";
import Error from "../error/Error";

const Profile: React.FC = () => {
  const userId = '1';
  // const userId = localStorage.getItem("userId");
  const {data, loading, error} = useQuery(GET_USERS);
  if(loading) return <Loading/>
  if(error) return <Error/>
  const {
    lastName,
    firstName,
    patronymic,
    type,
    email,
    phoneNumber,
    department,
    id}: User = data.users.find((user:User)=>user.id===userId);

  return <>
    <PageHeader body="Особистий кабінет"/>
    <p>П.І.Б.: {[lastName, firstName, patronymic].join(" ")}</p>
    <p>Кафедра: {department}</p>
    <p>Статус: {userTypesUa[type as userTypes]}</p>
    <p>E-mail: <a href={`mailto:${email}`}>{email}</a></p>
    <p>Тел: <a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
    <p>Курс: —</p>
  </>
}

export default Profile;