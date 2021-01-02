import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import arrowIcon from "./../../assets/menuIcons/arrow.png";
import { NavLink } from "react-router-dom";

type MenuItem = {
  text: string;
  path: string;
  icon: string;
  exact?: boolean;
};

type PropTypes = {
  children: Array<MenuItem>;
  divider: Array<number>;
};

const Sidebar: React.FC<PropTypes> = (props) => {
  let [collapsed, setCollapsed] = useState(false);
  const onClick = () => setCollapsed(!collapsed);
  return (
    <aside
      className={styles.sidebar}
      style={collapsed ? { width: "54px" } : { width: "230px" }}
    >
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
            ></NavLink>
          );
          for (let value of props.divider) {
            if (value === index + 1)
              return (
                <>
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
                </>
              );
          }
          return (
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
