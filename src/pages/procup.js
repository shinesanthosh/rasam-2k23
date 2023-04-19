import React, { useEffect, useState } from "react";
import styles from "../styles/Procup.module.scss";
import NavBar from "../components/navbar";
import SEO from "../components/SEO";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Procup = () => {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    console.log("getting events");
    fetch(process.env.NEXT_PUBLIC_GETEVENTS)
      .then((res) => res.json())
      .then((data) => {
        let eventsList = data.events;
        eventsList.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
        setEvents(eventsList);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getEvents();
  }, []);

  let historyArr = [];
  events.slice(0, 3).map((event, key) => {
    historyArr.push(
      <p key={key}>
        {event.events_teama.name} <span>{event.teama_score} </span>{" "}
        <span>VS </span> {event.events_teamb.name}{" "}
        <span> {event.teamb_score} </span>
      </p>
    );
  });

  return (
    <>
      <NavBar />
      <main className={styles.procMain}>
        <SEO
          title="Providence Cup"
          description="Live Scores and Updates. Providence Cup and George Mathew Memorial Trophie Tournaments"
          imageURL="/images/proc.png"
        />
        <div className={styles.procMask}>
          <Container fluid className={styles.procContainer}>
            <Row className={styles.imgRow}>
              <Col className={styles.procCol}>
                <img src="/images/proc.png" alt="PROC LOGO" />
                <img src="/images/gmmt.png" alt="GMMT LOGO" />
              </Col>
              {/* <img src="/images/proc.png" alt="PROC LOGO" />
              <img src="/images/gmmt.png" alt="GMMT LOGO" /> */}
            </Row>
            <Row className={styles.titleRow}>
              <h1>PROCUP & GMMT</h1>
            </Row>
          </Container>
          {/* <div className={styles.imgContainer}>
            <img src="/images/proc.png" alt="PROC LOGO" />
            <img src="/images/gmmt.png" alt="GMMT LOGO" />
          </div>
          <h1>PROCUP & GMMT</h1> */}
        </div>
      </main>
    </>
  );
};

export default Procup;
