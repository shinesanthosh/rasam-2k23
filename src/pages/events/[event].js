import React from 'react'
import SEO from '../../components/SEO'
import styles from '../../styles/DetailedEvent.module.scss'
import NavBar from '../../components/navbar'
import Button from 'react-bootstrap/Button'
import Router from 'next/router'
import Script from 'next/script'

export const getStaticPaths = async () => {
  const query = `*[_type == 'events']{slug{current}}`
  const url = process.env.CMSURL
  const res = await fetch(url + encodeURIComponent(query))
  const data = await res.json()

  let paths = []

  data.result.map((param, key) => {
    paths.push({ params: { event: param.slug.current } })
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const url = process.env.CMSURL
  const query = `*[_type == 'events' && slug.current == '${params.event}']{ name,date,details,short,url, cords[]{name, email, contact}, image{asset->{url}}, guidelines{asset->{url}},meta{title, desc, image{asset->{url}}, keywords} }`
  const res = await fetch(url + encodeURIComponent(query))
  const data = await res.json()

  return {
    props: { data: data.result[0] },
  }
}

const Event = ({ data }) => {
  /*
  
  Example data:
  
  {
  
    cords: [
      {
        contact: '+9xxxxxxxxx4',
        email: 'kevinxxxxxx@xxxxxxxx.in',
        name: 'Kevin'
      },

      {
        contact: '+91xxxxxxxxxxx9',
        email: 'samsonxxxxxxxx@xxxxxxxxxx.in',
        name: 'Samson'
      }
    ],

    date: '2023-04-27',
    
    details: "Bluetern is not just a football tournament; it's an experience that will leave participants exhilarated and inspired. The game requires quick reflexes, strategic thinking, and teamwork, making it a perfect test of skill for football enthusiasts. The intense 10-minute games will have you on the edge of your seat, as each team tries to outmaneuver the other and score as many goals as possible.",
    
    guidelines: {
      asset: {
        url: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-900x1600.jpg'
      }
    },

    image: {
      asset: {
        url: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-900x1600.jpg'
      }
    },

    meta: {
     
      desc: "Bluetern is a 3x3 football tournament that promises an exciting and adrenaline-filled experience. Join us for a unique celebration of the ocean and sports, where quick reflexes, strategic thinking, and teamwork are put to the test. Don't miss out on this unmissable opportunity to be a part of the most thrilling event on the planet!",
     
      image: { 
        asset: {
          url: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-900x1600.jpg'
        }
      
      },
      keywords: 'football, rasam, festival',
      
      title: 'Bluetern 3*3 Football'
    },
    
    name: 'BLUETERN 3*3 Football',
    short: '3*3 Football',
    url: 'https://google.com/'
}



  */

  return (
    <>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-9C3HWRW5DH'
        strategy='afterInteractive'></Script>
      <Script id='google-analytics' strategy='afterInteractive'>
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9C3HWRW5DH');`}
      </Script>

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
                  let elmt = key % 2 == 0 ? <hr /> : null
                  return (
                    <div className={styles.cord} key={key}>
                      <h5>{cord.name}</h5>
                      <p>
                        <a href={'mailto:' + cord.email}>{cord.email}</a>
                      </p>
                      <p>
                        <a href={'tel:' + cord.contact}> {cord.contact}</a>
                      </p>
                      {elmt}
                    </div>
                  )
                })}
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  variant='outline-warning'
                  size='lg'
                  className={styles.regButton}
                  onClick={() => {
                    // Router.push(data.url);
                    window.open(data.url, '_blank')
                  }}>
                  Register
                </Button>
              </div>
            </div>
            <div className={styles.containerRight}>
              <div className={styles.guidContainer}>
                <img src={data.guidelines.asset.url} alt='EVENT GUIDELINES' />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Event
