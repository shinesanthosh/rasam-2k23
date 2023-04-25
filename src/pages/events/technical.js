import React from 'react'
import Router from 'next/router'
import SEO from '../../components/SEO'
import NavBar from '../../components/navbar'
import styles from '../../styles/Events.module.scss'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { event } from 'jquery'

export const getStaticProps = async () => {
  const url = process.env.CMSURL
  let query = `*[_type == 'events' && type == 'tech']{name, short, date, slug{current},meta{image{asset->{url}}},image { asset -> {url}}, type}`
  let res = await fetch(url + encodeURIComponent(query))
  const data = await res.json()

  return {
    props: { data: data.result },
  }
}

const Events = ({ data }) => {
  //  The data prop holds the array of events to be displayed
  // Techdata holds technical events
  //  The array contains:
  // date: data[i].date
  // image url : data[i].image.asset.url
  // name: data[i].name
  // short desc: data[i].short
  // Link to the separate event pages: href={'/'+data[i].slug.current}
  return (
    <>
      <SEO
        title='Technical Events'
        description="Get ready to geek out at Rasam's technical events, where the coolest tech and the hottest minds come together to explore the cutting-edge of innovation. With a crazy mix of competitions, workshops, and talks on everything from AI to cybersecurity, you're sure to find something that tickles your fancy. Whether you're a coding ninja or a robot wrangler, we've got you covered. So bring your A-game, show off your skills, and make some nerdy new friends. Don't miss out on the tech-tastic fun - register now and join the party!"
      />

      <main className={styles.eventMain}>
        <NavBar />
        <div className={styles.mainMask}>
          <Container fluid className={styles.cardContainer}>
            <Row>
              <Col>
                <h1>Technical Events</h1>
              </Col>
            </Row>
            <Row>
              {data.map((event, key) => {
                return (
                  <Col className={styles.cardColumn} key={key}>
                    <Card style={{ width: '18rem' }} className={styles.Card}>
                      <Card.Img
                        variant='top'
                        src={event.meta.image.asset.url}
                      />
                      <Card.Body>
                        <Card.Title>{event.name.toUpperCase()}</Card.Title>
                        <Card.Text>{event.short}</Card.Text>
                        <Button
                          variant='outline-warning'
                          onClick={() => {
                            Router.push('/events/' + event.slug.current)
                          }}>
                          Know More
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Container>
        </div>
      </main>
    </>
  )
}

export default Events
