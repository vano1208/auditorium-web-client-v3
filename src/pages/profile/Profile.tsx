import React from 'react';
import styles from './profile.module.css';
import PageHeader from "../../components/pageHeader/PageHeader";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../../api/operations/queries/users";
import {User, userTypes, userTypesUa} from "../../models/models";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";

const Profile: React.FC = () => {
  const userId = sessionStorage.getItem("userId");
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
    startYear,
    degree,
    id}: User = data.users.find((user:User)=>user.id===userId);

  return <>
    <PageHeader body="Особистий кабінет"/>
    <table className={styles.profileTable}>
      <tbody>
      <tr>
        <td>Ваш особистий номер:</td>
        <td>{id}</td>
      </tr>
      <tr>
        <td>П.І.Б.:</td>
        <td>{[lastName, firstName, patronymic].join(" ")}</td>
      </tr>
      <tr>
        <td>Кафедра:</td>
        <td>{department}</td>
      </tr>
      <tr>
        <td>Статус:</td>
        <td>{userTypesUa[type as userTypes]}</td>
      </tr>
      <tr>
        <td>Освітній рівень:</td>
        <td>{degree}</td>
      </tr>
      <tr>
        <td>Рік початку навчання:</td>
        <td>{startYear}</td>
      </tr>
      <tr>
        <td>Тел.:</td>
        <td><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></td>
      </tr>
      <tr>
        <td>E-mail:</td>
        <td><a href={`mailto:${email}`}>{email}</a></td>
      </tr>
      </tbody>
    </table>
  </>
}

export default Profile;