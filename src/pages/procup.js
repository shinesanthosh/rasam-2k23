import React, { useEffect, useState } from 'react'
import styles from '../styles/Procup.module.scss'
import NavBar from '../components/navbar'
import SEO from '../components/SEO'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Procup = () => {
  
  return (
    <>
      <NavBar />
      <main className={styles.procMain}>
        <SEO
          title='Providence Cup'
          description='Live Scores and Updates. Providence Cup and George Mathew Memorial Trophie Tournaments'
          imageURL='/images/proc.png'
        />
        <div className={styles.procMask}>
          <Container fluid className={styles.procContainer}>
            <Row className={styles.imgRow}>
              <Col className={styles.procCol}>
                <img src='/images/proc.png' alt='PROC LOGO' />
                <img src='/images/gmmt.png' alt='GMMT LOGO' />
              </Col>
            </Row>
            <Row className={styles.titleRow}>
              <h1>Providence Cup & George Mathew Memorial Trophy</h1>
              {/* <h2>Final Scores</h2> */}
            </Row>
            <Row className={styles.liveScoreRow}>
              <Col className={styles.cardCol}>
                <div className={styles.card}>
                  <h4>GMMT Women&apos;s Basketball</h4>
                  <div className={styles.teamInfo}>
                    {/* TEAM NAME SHOULD GO HERE */}
                    <h2>ACC</h2>
                    <h1>VS</h1>
                    <h2>AJCE</h2>
                  </div>
                  <div className={styles.scoreBoard}>
                    {/* SCORE SHOULD GO HERE */}
                    <div className={styles.homeScore}>
                      <h1>29</h1>
                    </div>
                    <div className={styles.awayScore}>
                      <h1>12</h1>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className={styles.cardCol}>
                <div className={styles.card}>
                  <h4>ProCup Men&apos;s Football</h4>
                  <div className={styles.teamInfo}>
                    <h2>
                      MDC
                    </h2>
                    <h1>VS</h1>
                    <h2>
                      SBC
                    </h2>
                  </div>
                  <div className={styles.scoreBoard}>
                    {/* SCORE SHOULD GO HERE */}
                    <div className={styles.homeScore}>
                      <h1>0</h1>
                    </div>
                    <div className={styles.awayScore}>
                      <h1>1</h1>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className={styles.cardCol}>
                <div className={styles.card}>
                  <h4>GMMT Men&apos;s Basketball</h4>
                  <div className={styles.teamInfo}>
                    <h2>SAHRDAYA</h2>
                    <h1>VS</h1>
                    <h2>KE</h2>
                  </div>
                  <div className={styles.scoreBoard}>
                    {/* SCORE SHOULD GO HERE */}
                    <div className={styles.homeScore}>
                      <h1>71</h1>
                    </div>
                    <div className={styles.awayScore}>
                      <h1>50  </h1>
                    </div>
                  </div>
                </div>
              </Col>
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
  )
}

export default Procup
