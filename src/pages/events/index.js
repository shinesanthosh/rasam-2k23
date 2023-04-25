import React from "react";
import styles from "../../styles/Selection.module.scss";

const Selection = () => {
  return (
    <>
      <main className={styles.selectionMain}>
        <div className={styles.selectionMask}>
          <div className={styles.selectionLeft}>
            <div className={styles.culturalDiv}>
              <div className={styles.coverDiv}>
                <h1>Cultural Events</h1>
              </div>
            </div>
          </div>
          <div className={styles.selectionRight}>
            <div className={styles.technicalDiv}>
              <div className={styles.coverDiv}>
                <h1>Tech Events</h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Selection;
