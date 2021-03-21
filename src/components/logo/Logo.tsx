import React from "react";
import styles from "./logo.module.css";

interface PropTypes {
  title: string;
  description: string;
  size?: "small" | "default";
}

const Logo: React.FC<PropTypes> = ({
  title,
  description,
  size = "default",
}) => {
  const style = {};
  return (
    <div className={styles.logoWrapper}>
      <div
        className={
          size === "default"
            ? styles.logo
            : size === "small"
            ? styles.smallLogo
            : styles.logo
        }
      >
        <div className={styles.logoText}>
          <h1
            className={
              size === "default"
                ? styles.logoTitle
                : size === "small"
                ? styles.smallLogoTitle
                : styles.logoTitle
            }
          >
            {title}
          </h1>
          {size !== "small" && (
            <h2 className={styles.logoDescription}>{description}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logo;
