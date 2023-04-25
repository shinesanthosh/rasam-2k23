import React from "react";
import SEO from "../../components/SEO";
import styles from "../../styles/DetailedEvent.module.scss";
import NavBar from "../../components/navbar";
import Button from "react-bootstrap/Button";
import Router from "next/router";

export const getStaticPaths = async () => {
  const query = `*[_type == 'events']{slug{current}}`;
  const url = process.env.CMSURL;
  const res = await fetch(url + encodeURIComponent(query));
  const data = await res.json();

  let paths = [];

  data.result.map((param, key) => {
    paths.push({ params: { event: param.slug.current } });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const url = process.env.CMSURL;
  const query = `*[_type == 'events' && slug.current == '${params.event}']{ name,date,details,guidelinestxt,short,url, cords[]{name, email, contact}, image{asset->{url}}, guidelines{asset->{url}},meta{title, desc, image{asset->{url}}, keywords} }`;
  const res = await fetch(url + encodeURIComponent(query));
  const data = await res.json();

  return {
    props: { data: data.result[0] },
  };
};

const Event = ({ data }) => {
  // console.log(data);

  /*
  
  Example data:
  
  {
  {
  details: 'Mad (Making a Difference) is a business design competition that challenges participants to create innovative solutions to real-world problems. Participants will be required to develop a new product or service that addresses a pressing societal issue and is financially viable. ',
  guidelinestxt: [
    '•\tEach team must comprise a minimum of 2 or a maximum of 3 members.',
    '•\tThe topics for the competition will be given on the spot.',
    '•\tTeams will be given materials that they can use to create something innovative.',
    '•\tPosters can be made as a part of the advertisement.',
    '•\tTeams would be required to formulate a catch line/tagline for the proposed product',
    '•\tPresentation time limit of the advertisement is 5 minutes.',
    '•\tThe decision of the Judges will be final and binding.'
  ],
  short: 'Business designing',
  url: null,
  image: {
    asset: {
      url: 'https://xxxxxx/720x1280.png'
    }
  },
  guidelines: {
    asset: {
      url: 'https://xxxxxxx/-720x1280.png'
    }
  },
  name: 'MAD',
  date: null,
  meta: {
    title: 'MAD',
    desc: 'Business designing',
    image: { asset: [Object] },
    keywords: null
  },
  cords: [
    {
      contact: 'xxxxx',
      name: 'Stalan Varghese Mathew',
      email: 'xxxxxx'
    }
  ]
}



  */

  return (
    <>
      <SEO
        title={data.meta.title}
        description={data.meta.desc}
        imageURL={data.meta.image.asset.url}
      />
      <NavBar />
      <main className={styles.eventMain}>
        <div className={styles.eventMask}>
          <div className={styles.eventCard}>
            <div className={styles.containerLeft}>
              <h1>{data.meta.title}</h1>
              <div className={styles.pContainer}>
                <p>{data.details}</p>
              </div>
              <h3>Co-ordinators</h3>
              <div className={styles.cordContainer}>
                {data.cords.map((cord, key) => {
                  let elmt = key % 2 == 0 ? <hr /> : null;
                  return (
                    <div className={styles.cord} key={key}>
                      <h5>{cord.name}</h5>
                      <p>
                        <a href={"mailto:" + cord.email}>{cord.email}</a>
                      </p>
                      <p>
                        <a href={"tel:" + cord.contact}> {cord.contact}</a>
                      </p>
                      {elmt}
                    </div>
                  );
                })}
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  variant="outline-warning"
                  size="lg"
                  className={styles.regButton}
                  onClick={() => {
                    // Router.push(data.url);
                    window.open(data.url, "_blank");
                  }}
                >
                  Register
                </Button>
              </div>
            </div>
            <div className={styles.containerRight}>
              <div className={styles.guidContainer}>
                <img src={data.guidelines.asset.url} alt="EVENT GUIDELINES" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Event;
