import React from "react";
import styles from "./inputForm.module.css";

function InputForm({ submit }) {
  //

  return (
    <>
      <form className={styles.form} onSubmit={submit}>
        <input type="text" className={styles.input}></input>
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>
    </>
  );
}

export default InputForm;
