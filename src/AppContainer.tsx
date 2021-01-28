import React, { useEffect, useState } from "react";
import homeIcon from "./assets/menuIcons/home.png";
import auditoriumsIcon from "./assets/menuIcons/auditoriums.png";
import registerIcon from "./assets/menuIcons/register.png";
import usersIcon from "./assets/menuIcons/users.png";
import administrationIcon from "./assets/menuIcons/administration.png";
import profileIcon from "./assets/menuIcons/profile.png";
import logoutIcon from "./assets/menuIcons/logout.png";
import scheduleIcon from "./assets/menuIcons/schedule.png";
import { client, meType } from "./api/client";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "./api/operations/queries/users";
import { MenuElement, userTypes } from "./models/models";
import App from "./App";
import { GET_ME_TYPE } from "./api/operations/queries/me";
import LoadingSplash from "./pages/loadingSplash/LoadingSplash";

const AppContainer: React.FC = () => {
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {}, [userLoading]);
  const menuElements: Array<MenuElement> = [
    {
      text: "Головна",
      path: "/",
      icon: homeIcon,
      exact: true,
      rights: "USER",
    },
    {
      text: "Аудиторії",
      path: "/auditoriums",
      icon: auditoriumsIcon,
      rights: "USER",
    },
    {
      text: "Журнал",
      path: "/register",
      icon: registerIcon,
      rights: "ADMIN",
    },
    {
      text: "Розклад",
      path: "/schedule",
      icon: scheduleIcon,
      rights: "USER",
    },
    {
      text: "Користувачі",
      path: "/users",
      icon: usersIcon,
      rights: "USER",
    },
    {
      text: "Адміністрування",
      path: "/admin",
      icon: administrationIcon,
      rights: "ADMIN",
    },
    {
      text: "Профіль",
      path: "/profile",
      icon: profileIcon,
      rights: "USER",
    },
    {
      text: "Вийти",
      path: "/logout",
      icon: logoutIcon,
      rights: "USER",
    },
  ];
  const [isLogged, setIsLogged] = useState(
    sessionStorage.getItem("userId") !== null ? true : false
  );
  const [verified, setVerified] = useState(false);
  const { data: meCurrentType } = useQuery(GET_ME_TYPE);
  const getUser = async () => {
    const { data } = await client.query({
      query: GET_USER_BY_ID,
      variables: {
        id: Number(sessionStorage.getItem("userId")),
      },
    });
    setVerified(data.user.verified);
    if (
      data.user.type === userTypes.ADMIN ||
      data.user.type === userTypes.DISPATCHER
    ) {
      meType("ADMIN");
    } else {
      meType("USER");
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("userId") !== null)
      getUser().then((r) => setUserLoading(false));
  });

  return userLoading && isLogged ? (
    <LoadingSplash />
  ) : (
    <App
      isLogged={isLogged}
      setIsLogged={setIsLogged}
      menuElements={menuElements}
      meCurrentType={meCurrentType.meType}
      verified={verified}
    />
  );
};

export default AppContainer;
