import React, {useState} from "react";
import styles from "./App.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import homeIcon from "./assets/menuIcons/home.png";
import auditoriumsIcon from "./assets/menuIcons/auditoriums.png";
import registerIcon from "./assets/menuIcons/register.png";
import usersIcon from "./assets/menuIcons/users.png";
import administrationIcon from "./assets/menuIcons/administration.png";
import profileIcon from "./assets/menuIcons/profile.png";
import logoutIcon from "./assets/menuIcons/logout.png";
import scheduleIcon from "./assets/menuIcons/schedule.png";
import {Route} from "react-router-dom";
import Register from "./pages/register/Register";
import Users from "./pages/users/Users";
import Schedule from "./pages/schedule/Schedule";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import AdminPanel from "./components/adminPanel/AdminPanel";
import Home from "./pages/home/Home";
import ClassroomsGridContainer from "./pages/classrooms/ClassroomGridConrainer";
import {meType} from "./api/client";
import {gql, useQuery} from "@apollo/client";
import {GET_USERS} from "./api/operations/queries/users";
import {User, userTypes} from "./models/models";

function App() {
  const menuElements = [
    {
      text: "Головна",
      path: "/",
      icon: homeIcon,
      exact: true,
      rights: "USER"
    },
    {
      text: "Аудиторії",
      path: "/auditoriums",
      icon: auditoriumsIcon,
      rights: "USER"
    },
    {
      text: "Журнал",
      path: "/register",
      icon: registerIcon,
      rights: "ADMINISTRATION"
    },
    {
      text: "Розклад",
      path: "/schedule",
      icon: scheduleIcon,
      rights: "USER"
    },
    {
      text: "Користувачі",
      path: "/users",
      icon: usersIcon,
      rights: "USER"
    },
    {
      text: "Адміністрування",
      path: "/admin",
      icon: administrationIcon,
      rights: "ADMINISTRATION"
    },
    {
      text: "Профіль",
      path: "/profile",
      icon: profileIcon,
      rights: "USER"
    },
    {
      text: "Вийти",
      path: "/logout",
      icon: logoutIcon,
      rights: "USER"
    },
  ];
  const [isLogged, setIsLogged] = useState(sessionStorage.getItem("userId") !== null ? true : false)
  const {data, loading, error: errorUsers} = useQuery(GET_USERS);
  const {data: meCurrentType, error: errorMeType} = useQuery(gql`
      query meType {
          meType @client
      }
  `);
  if (isLogged && !loading && !errorUsers) {
    const {type}: User = data.users.find((user: User) => user.id === sessionStorage.getItem("userId"));
    let isAdmin = type === "ADMINISTRATION" ? "ADMINISTRATION" : "USER"
    meType(isAdmin)
  } else {
    meType("USER")
  }
  return (
    <div className={styles.container}>
      {isLogged && <Sidebar divider={[4, 9]} children={menuElements.filter(item => {
        if (meCurrentType.meType === "USER") {
          return item.rights === meCurrentType.meType
        } else {
          return true
        }
      })}/>}
      <main>
        {!isLogged && <Login setIsLogged={(value) => setIsLogged(value)}/>}
        <Route path="/auditoriums/:classroomId?">
          <ClassroomsGridContainer meType={meCurrentType.meType}/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        {meCurrentType.meType === userTypes.ADMINISTRATION ? <>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/admin">
            <AdminPanel/>
          </Route>
        </> : null}
        <Route path="/users/:userId?">
          <Users meType={meCurrentType.meType}/>
        </Route>
        <Route path="/schedule">
          <Schedule/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
      </main>
    </div>
  );
}

export default App;
