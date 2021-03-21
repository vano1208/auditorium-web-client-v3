import React from "react";
import styles from "./content.module.css";
import Home from "../../../pages/home/Home";
import { Route, Switch } from "react-router-dom";
import Registry from "../../../pages/registry/Registry";
import Schedule from "../../../pages/schedule/Schedule";
import Users from "../../../pages/users/Users";
import Profile from "../../../pages/profile/Profile";
import ClassroomsContainer from "../../../pages/classrooms/ClassroomsContainer";

const Content = () => {
  return (
    <div className={styles.content}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/classrooms/:classroomName?" component={ClassroomsContainer} />
        <Route path="/registry/:userId?" component={Registry} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/users:userId?" component={Users} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
};

export default Content;
