import React, { useState } from "react";
import styles from "./sidebar.module.css";
import Logo from "../../logo/Logo";
import { NavLink, Route, Switch } from "react-router-dom";
import menuIcon from "../../../assets/images/menu.svg";
import homeIcon from "../../../assets/images/home.svg";
import classroomsIcon from "../../../assets/images/classrooms.svg";
import registryIcon from "../../../assets/images/registry.svg";
import scheduleIcon from "../../../assets/images/schedule.svg";
import profileIcon from "../../../assets/images/profile.svg";
import usersIcon from "../../../assets/images/users.svg";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const onMenuClick = () => setCollapsed((prevState) => !prevState);
  const onClick = () =>
    setCollapsed((prevState) => {
      if (screenWidth < 1024) {
        return !prevState;
      } else {
        return prevState;
      }
    });
  const screenWidth = window.screen.width;
  return (
    <div
      className={[styles[collapsed.toString()], styles.navigation].join(" ")}
    >
      <div onClick={onMenuClick} className={styles.logoWrapper}>
        <Logo
          title={collapsed ? "Au" : "Auditorium"}
          description="Система управління видачею аудиторій"
          size="small"
        />
      </div>
      <img
        onClick={onMenuClick}
        className={styles.menuIcon}
        src={menuIcon}
        alt="menu"
      />
      <p className={styles.currentPageName}>
        <Switch>
          <Route exact path="/">
            Головна
          </Route>
          <Route exact path="/classrooms">
            Аудиторії
          </Route>
          <Route exact path="/registry">
            Журнал
          </Route>
          <Route exact path="/schedule">
            Розклад
          </Route>
          <Route exact path="/users">
            Користувачі
          </Route>
          <Route exact path="/profile">
            Профіль
          </Route>
        </Switch>
      </p>
      <ul>
        <li>
          <NavLink
            activeClassName={styles.linkActive}
            exact
            className={styles.link}
            onClick={onClick}
            to="/"
          >
            <img className={styles.icon} src={homeIcon} alt="home" />
            Головна
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.linkActive}
            className={styles.link}
            onClick={onClick}
            to="/classrooms"
          >
            <img className={styles.icon} src={classroomsIcon} alt="classrooms" />
            Аудиторії
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.linkActive}
            className={styles.link}
            onClick={onClick}
            to="/registry"
          >
            <img className={styles.icon} src={registryIcon} alt="registry" />
            Журнал
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.linkActive}
            className={styles.link}
            onClick={onClick}
            to="/schedule"
          >
            <img className={styles.icon} src={scheduleIcon} alt="schedule" />
            Розклад
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.linkActive}
            className={styles.link}
            onClick={onClick}
            to="/users"
          >
            <img className={styles.icon} src={usersIcon} alt="users" />
            Користувачі
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.linkActive}
            className={styles.link}
            onClick={onClick}
            to="/profile"
          >
            <img className={styles.icon} src={profileIcon} alt="profile" />
            Профіль
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
