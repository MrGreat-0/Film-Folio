import React from "react";
import styles from "./Loader.module.css";

const SearchBarLoader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.shadow}></div>
      <div className={styles.shadow}></div>
      <div className={styles.shadow}></div>
    </div>
  );
};

export default SearchBarLoader;
