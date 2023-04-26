import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.scss";
import NavBar from "../components/navbar";
import Days from "../components/days";
import Clock from "../components/countdown";
import SEO from "@/components/SEO";
import Router from "next/router";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);

    const handleResize = () => {
      setIsMobile(mobileQuery.matches);
    };
    mobileQuery.addEventListener("change", handleResize);

    return () => {
      mobileQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const source = video.querySelector("source");

      if (isMobile) {
        source.src =
          "https://res.cloudinary.com/ddb1tjuew/video/upload/v1681925404/mob_background_xa6nme.mp4";
      } else {
        source.src =
          "https://res.cloudinary.com/ddb1tjuew/video/upload/v1681925124/raw_background_m3stgx.mp4";
      }

      video.load();
    }
  }, [isMobile]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
      <SEO
        title="Home"
        description="Dive into the fourth season of RASAM, our highly anticipated college tech and cultural fest with an underwater twist. Immerse yourself in a spectacular blend of cutting-edge technology, artistic expression, and intellectual curiosity that will leave you spellbound. From electrifying performances by renowned artists to gripping competitions and workshops, RASAM Season 4 promises to offer an unparalleled opportunity for learning, exploration, and fun. Explore the depths of the unknown with us and discover a world of creativity, innovation, and diversity that will take your breath away. Come and experience the rush of adrenaline and the tranquility of the deep, all in one unforgettable event"
      />
      <NavBar />

      <main className={styles.mainContainer}>
        <div className={styles.vipContainer}>
          <div className={styles.vipPass} onClick={() => Router.push("/vip")}>
            <h1>VIP Pass</h1>
          </div>
          <div
            className={styles.proShow}
            onClick={() => {
              window.open("https://forms.gle/Fzs6QzUW2JXGvcxH6", "_blank");
            }}
          >
            <h1>PROSHOW Pass</h1>
          </div>
        </div>

        <div className={styles.videoContainer}>
          <video autoPlay muted loop ref={videoRef}>
            <source
              src="https://res.cloudinary.com/ddb1tjuew/video/upload/v1681925124/raw_background_m3stgx.mp4"
              type="video/mp4"
            />
          </video>
          <img src="/images/logo.png" alt="rasam logo" />
          <div className={styles.clockContainer}>
            <Days />
            <Clock />
          </div>
        </div>
      </main>
      <footer className={styles.homeFooter}>
        {/* <img src="/images/bob.png" alt="easter egg" /> */}
        <div className={styles.footerLeft}>
          <h1>Get In Touch</h1>
          <div className={styles.contact}>
            <a
              href="https://www.instagram.com/rasam.by.providence/"
              target="blank"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/rasambyprovidence/"
              target="blank7"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://wa.me/+919847651097">
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>
        <div className={styles.footerMiddle}>
          <div className={styles.footerLogo}>
            <img src="/images/prc-logo.png" alt="LOGO" />
            {/* <p>
              &#169; Providence College of Engineering and School of Business
            </p> */}
          </div>
        </div>

        <div className={styles.footerRight}>
          <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.382652086006!2d76.61202467491256!3d9.299321490773194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0622984cfaf3af%3A0xd0320f890b6fca5!2sProvidence%20College%20of%20Engineering%20%26%20School%20of%20Business%2C%20Chengannur!5e0!3m2!1sen!2sin!4v1681193448036!5m2!1sen!2sin&maptype=roadmap"
            width="500"
            height="250"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </footer>
    </>
  );
};

export default Home;
