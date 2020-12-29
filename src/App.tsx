import React from "react";
import styles from "./App.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import homeIcon from "./assets/menuIcons/home.png";
import auditoriumsIcon from "./assets/menuIcons/auditoriums.png";
import registerIcon from "./assets/menuIcons/register.png";
import usersIcon from "./assets/menuIcons/users.png";
import administrationIcon from "./assets/menuIcons/administration.png";
import settingsIcon from "./assets/menuIcons/settings.png";
import profileIcon from "./assets/menuIcons/profile.png";
import logoutIcon from "./assets/menuIcons/logout.png";
import scheduleIcon from "./assets/menuIcons/schedule.png";
import { useQuery } from "@apollo/client";
import { GET_CLASSROOMS } from "./api/operations/queries/classrooms";
import { Classroom } from "./models/models";
import ClassroomsGrid from "./components/classroomsGrid/classroomsGrid/ClassroomsGrid";
import { Route } from "react-router-dom";
import Caviar from "./components/classroomsGrid/caviar/Caviar";
import Register from "./components/register/Register";
import Users from "./components/users/Users";
import Schedule from "./components/schedule/Schedule";

function App() {
  const menuElements = [
    {
      text: "Головна",
      path: "/",
      icon: homeIcon,
      exact: true,
    },
    {
      text: "Аудиторії",
      path: "/auditoriums",
      icon: auditoriumsIcon,
    },
    {
      text: "Журнал",
      path: "/register",
      icon: registerIcon,
    },
    {
      text: "Розклад",
      path: "/schedule",
      icon: scheduleIcon,
    },
    {
      text: "Користувачі",
      path: "/users",
      icon: usersIcon,
    },
    {
      text: "Адміністрування",
      path: "/admin",
      icon: administrationIcon,
    },
    {
      text: "Налаштування",
      path: "/settings",
      icon: settingsIcon,
    },
    {
      text: "Профіль",
      path: "/profile",
      icon: profileIcon,
    },
    {
      text: "Вийти",
      path: "/logout",
      icon: logoutIcon,
    },
  ];
  const { loading, data, error } = useQuery(GET_CLASSROOMS, {
    variables: {
      date: new Date().toString(),
    },
    fetchPolicy: "network-only",
  });
  let filter = "ALL";
  let classroomsFilter =
    filter === "FREE"
      ? (classroom: Classroom) => classroom.occupied === null
      : filter === "SPECIAL"
      ? (classroom: Classroom) => classroom.special !== null
      : filter === "CHAIR"
      ? (classroom: Classroom) => classroom.chair !== null
      : () => true;
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>error</h1>;
  const classrooms = data.classrooms
    .slice()
    .sort((a: Classroom, b: Classroom) => Number(a.name) - Number(b.name));
  return (
    <div className={styles.container}>
      <Sidebar divider={[4, 9]} children={menuElements} />
      <main>
        <Route path="/auditoriums/:classroomId?">
          <Caviar classroomsFilter={classroomsFilter} classrooms={classrooms} />
          <ClassroomsGrid classrooms={classrooms} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
      </main>
    </div>
  );
}

export default App;
