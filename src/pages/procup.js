import React, { useEffect, useState } from 'react'
import styles from '../styles/Procup.module.scss'
import NavBar from '../components/navbar'
import SEO from '../components/SEO'
import { data } from 'jquery'

const Procup = () => {
  const [events, setEvents] = useState([])

  const getEvents = () => {
    console.log('getting events')
    fetch(process.env.NEXT_PUBLIC_GETEVENTS)
      .then((res) => res.json())
      .then((data) => {
        let eventsList = data.events
        eventsList.sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        setEvents(eventsList)
      })
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    getEvents()
  }, [])

  let historyArr = []
  events.slice(0, 3).map((event, key) => {
    historyArr.push(
      <p key={key}>
        {event.events_teama.name} <span>{event.teama_score} </span>{' '}
        <span>VS </span> {event.events_teamb.name}{' '}
        <span> {event.teamb_score} </span>
      </p>
    )
  })

  return (
    <div className={styles.procMain}>
      <SEO
        title='Providence Cup'
        description='Live Scores and Updates. Providence Cup and George Mathew Memorial Trophie Tournaments'
        imageURL='/images/proc.png'
      />
      <NavBar />
      <div className={styles.procMask}>
        <div className={styles.imgContainer}>
          <img src='/images/proc.png' alt='PROC LOGO' />
          <img src='/images/gmmt.png' alt='GMMT LOGO' />
        </div>
        <h1>PROCUP & GMMT</h1>

        <div className={styles.cardContainer}>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
          <div className={styles.card}></div>
        </div>

        <h2>HISTORY</h2>
        {/* DATA HERE */}
        <div className={styles.historyContainer}>{historyArr}</div>

        <h2>UPCOMING</h2>
      </div>
    </div>
  )
}

export default Procup
