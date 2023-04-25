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
    props: { data: data.result},
  }
}

const Events = ({ data,  }) => {
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
        title='Events'
        description="Welcome to Rasam, the ultimate fest that promises non-stop enjoyment and fun! Explore the list of events that we have in store for you, ranging from cultural activities to sports tournaments and tech competitions. Join us for 3 days of entertainment and laughter, and create unforgettable memories with your friends. Don't miss out on the excitement and register for your favorite events now!"
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
