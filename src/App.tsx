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
import { Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Users from "./pages/users/Users";
import Schedule from "./pages/schedule/Schedule";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import AdminPanel from "./components/adminPanel/AdminPanel";
import Home from "./pages/home/Home";
import ClassroomsGridContainer from "./pages/classrooms/ClassroomGridConrainer";

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
  const [isLogged, setIsLogged] = useState(sessionStorage.getItem("userId")!==null?true:false)
  return (
    <div className={styles.container}>
      {isLogged && <Sidebar divider={[4, 9]} children={menuElements} />}
      <main>
        {!isLogged && <Login setIsLogged={(value)=>setIsLogged(value)}/>}
        <Route path="/auditoriums/:classroomId?">
            <ClassroomsGridContainer/>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/users/:userId?">
          <Users />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/admin">
          <AdminPanel/>
        </Route>
      </main>
    </div>
  );
}

export default App;
