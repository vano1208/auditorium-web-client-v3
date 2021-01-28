import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import arrowIcon from "./../../assets/menuIcons/arrow.png";
import { NavLink } from "react-router-dom";
import { MenuElement } from "../../models/models";

type PropTypes = {
  children: Array<MenuElement>;
  divider: Array<number>;
  setIsLogged: (value: boolean) => void;
};

const Sidebar: React.FC<PropTypes> = (props) => {
  let [collapsed, setCollapsed] = useState(false);
  const onClick = () => setCollapsed(!collapsed);
  return (
    <aside className={collapsed ? styles.collapsed : styles.opened}>
      <div className={styles.fixed}>
        <div className={styles.logo}>
          <h1>{collapsed ? "Au" : "Auditorium"}</h1>
        </div>
        <ul>
          {props.children.map((item, index) => {
            let iconStyle = {
              backgroundImage: "url(" + item.icon + ")",
            };
            let linkItem = (
              <NavLink
                exact={item.exact}
                activeClassName={styles.active}
                style={iconStyle}
                to={item.path}
              />
            );
            for (let value of props.divider) {
              if (value === index + 1)
                return (
                  <div key={item.path}>
                    <li key={item.path}>
                      {collapsed ? (
                        linkItem
                      ) : (
                        <NavLink
                          activeClassName={styles.active}
                          style={iconStyle}
                          exact={item.exact}
                          to={item.path}
                        >
                          {item.text}
                        </NavLink>
                      )}
                    </li>
                    <hr />
                  </div>
                );
            }
            return (
              <li
                key={item.path}
                onClick={() => {
                  if (item.path === "/logout") {
                    sessionStorage.removeItem("userId");
                    localStorage.removeItem("userId");
                    props.setIsLogged(false);
                  }
                }}
              >
                {collapsed ? (
                  linkItem
                ) : (
                  <NavLink
                    activeClassName={styles.active}
                    style={iconStyle}
                    exact={item.exact}
                    to={item.path}
                  >
                    {item.text}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
        <div
          style={{ cursor: "pointer" }}
          className={collapsed ? styles.rotatedImage : styles.unrotatedImage}
          onClick={onClick}
        >
          <img src={arrowIcon} alt="Сховати/показати" />
        </div>
        <a
          className={styles.knmauLink}
          href="https://knmau.com.ua/"
          target="_blank"
          rel="noreferrer"
          style={collapsed ? { width: "35px" } : { width: "208px" }}
        >
          {collapsed
            ? "НМАУ"
            : "Національна Музична Академія України ім. П. І. Чайковського"}
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
