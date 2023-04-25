import React from 'react'
import styles from '../../styles/Selection.module.scss'
import Router from 'next/router'

const Selection = () => {
  return (
    <>
      <main className={styles.selectionMain}>
        <div className={styles.selectionMask}>
          <div className={styles.selectionLeft}>
            <div className={styles.culturalDiv}>
              <div
                className={styles.coverDiv}
                onClick={() => Router.push('/events/cultural')}>
                <h1>Cultural Events</h1>
              </div>
            </div>
          </div>
          <div className={styles.selectionRight}>
            <div className={styles.technicalDiv}>
              <div
                className={styles.coverDiv}
                onClick={() => Router.push('/events/technical')}>
                <h1>Tech Events</h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Selection
