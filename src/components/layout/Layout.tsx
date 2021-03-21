import React from "react";
import styles from "./layout.module.css";
import Sidebar from "./sidebar/Sidebar";
import Content from "./content/Content";
import { gql, useQuery } from "@apollo/client";

const Layout = () => {
  const { data: isBlurred } = useQuery(gql`
    query isBlurred {
      isBlurred @client
    }
  `);
  return (
    <div
      className={[
        styles.layout,
        isBlurred.isBlurred ? styles.blurred : "",
      ].join(" ")}
    >
      <nav>
        <Sidebar />
      </nav>
      <main>
        <Content />
      </main>
    </div>
  );
};

export default Layout;
