import React from 'react'
import styles from '../../styles/Selection.module.scss'
import Router from 'next/router'
import SEO from '../../components/SEO'

const Selection = () => {
  return (
    <>
      <SEO
        title='Events'
        description="Welcome to Rasam, the ultimate fest that promises non-stop enjoyment and fun! Explore the list of events that we have in store for you, ranging from cultural activities to sports tournaments and tech competitions. Join us for 3 days of entertainment and laughter, and create unforgettable memories with your friends. Don't miss out on the excitement and register for your favorite events now!"
      />
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
