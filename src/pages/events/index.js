import React from "react";
import SEO from "../../components/SEO";
import NavBar from "../../components/navbar";
import styles from "../../styles/Events.module.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const getStaticProps = async () => {
  const url = process.env.CMSURL;
  const query = `*[_type == 'events']{name, short, date, slug{current},meta{image{asset->{url}}},image { asset -> {url}}}`;
  const res = await fetch(url + encodeURIComponent(query));
  const data = await res.json();

  return {
    props: { data: data.result },
  };
};

const Events = ({ data }) => {
  //  The data prop holds the array of events to be displayed
  //  The array contains:
  // date: data[i].date
  // image url : data[i].image.asset.url
  // name: data[i].name
  // short desc: data[i].short
  // Link to the separate event pages: href={'/'+data[i].slug.current}
  return (
    <>
      <SEO title="Events" description="The awesome events at RASAM" />

      <main className={styles.eventMain}>
        <NavBar />
        <div className={styles.mainMask}>
          <h1>Events</h1>
          <Container fluid className={styles.cardContainer}>
            <Row>
              {data.map((event, key) => {
                return (
                  <Col className={styles.cardColumn} key={key}>
                    <Card style={{ width: "18rem" }} className={styles.Card}>
                      <Card.Img
                        variant="top"
                        src={event.meta.image.asset.url}
                      />
                      <Card.Body>
                        <Card.Title>{event.name.toUpperCase()}</Card.Title>
                        <Card.Text>{event.short}</Card.Text>
                        <Button variant="outline-warning">Know More</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </main>
    </>
  );
};

export default Events;
