import React from "react";
import styles from "./App.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Users from "./pages/users/Users";
import Schedule from "./pages/schedule/Schedule";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import AdminPanel from "./components/adminPanel/AdminPanel";
import ClassroomsGridContainer from "./pages/classrooms/ClassroomGridConrainer";
import { MenuElement, userTypes } from "./models/models";
import Home from "./pages/home/Home";

interface PT {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  menuElements: Array<MenuElement>;
  meCurrentType: string;
}

const App: React.FC<PT> = ({
  isLogged,
  setIsLogged,
  menuElements,
  meCurrentType,
}) => {
  return (
    <div className={styles.container}>
      {isLogged && (
        <Sidebar divider={[4, 9]}>
          {menuElements.filter((item) => {
            if (meCurrentType === "USER") {
              return item.rights === meCurrentType;
            } else {
              return true;
            }
          })}
        </Sidebar>
      )}
      <main>
        {!isLogged && <Login setIsLogged={(value) => setIsLogged(value)} />}
        <Route path="/auditoriums/:classroomName?">
          <ClassroomsGridContainer meType={meCurrentType} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        {meCurrentType === userTypes.ADMIN ? (
          <>
            {console.log("test")}
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/admin">
              <AdminPanel />
            </Route>
          </>
        ) : null}
        <Route path="/users/:userId?">
          <Users meType={meCurrentType} />
        </Route>
        <Route path="/schedule">
          <Schedule />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </main>
    </div>
  );
};

export default App;
