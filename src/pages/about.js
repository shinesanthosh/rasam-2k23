import React, { useEffect, useState, useRef } from 'react'
import NavBar from '../components/navbar'
import SEO from '../components/SEO'
import styles from '../styles/About.module.scss'
import ImgCarousel from '../components/carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Script from 'next/script'

export const getStaticProps = async () => {
  const url = process.env.CMSURL
  const query = `*[_type == 'pages' && slug.current == 'pages']{about{ title, Content[]{children[]} , carousel[]{ asset->{url} },metadata {title, desc, image{ asset->{url} }} } }`
  const res = await fetch(url + encodeURIComponent(query))
  const data = await res.json()

  return {
    props: { data: data.result },
  }
}

const About = ({ data }) => {
  const elemList = []
  const pagedata = data[0].about
  const [bodyContent, useBodyContent] = useState([])

  const videoRef = useRef(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mobileQuery.matches)

    const handleResize = () => {
      setIsMobile(mobileQuery.matches)
    }
    mobileQuery.addEventListener('change', handleResize)

    return () => {
      mobileQuery.removeEventListener('change', handleResize)
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      const source = video.querySelector('source')

      if (isMobile) {
        source.src = '/videos/mob_background.mp4'
      } else {
        source.src = '/videos/raw_background.mp4'
      }

      video.load()
    }
  }, [isMobile])

  const children = pagedata.Content[0].children

  for (let i in children) {
    if (children[i].marks[0] == 'strong')
      elemList.push(<strong>{children[i].text}</strong>)
    else if (children[i]._type == 'span')
      elemList.push(<span>{children[i].text}</span>)
  }

  return (
    <main className={styles.aboutMain}>
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
      <SEO title='About' description='This is all about the about page' />
      <NavBar />
      <div className={styles.aboutMask}>
        <Container fluid className={styles.aboutContainer}>
          <Row className={styles.aboutRow}>
            <Col className={styles.aboutContent}>
              <h1>
                ABOUT <span>RASAM</span>
              </h1>
              <p>{elemList}</p>
            </Col>
          </Row>
          <Row className={styles.aboutRow}>
            <div className={styles.carouselContainer}>
              <h1>Glimpses of RASAM</h1>

              <ImgCarousel cardata={pagedata.carousel} />
            </div>
          </Row>
          <Row className={styles.aboutRow}>
            <div className={styles.sponsorContainer}>
              <h1>SPONSORS</h1>
              {/* <p>Swimming your way soon!</p> */}
              <div className={styles.spimgContainer}>
                <img src='/images/title.jpg' alt='TITLE SPONSOR' />
                <p>Title Sponsor</p>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </main>
  )
}

export default About
