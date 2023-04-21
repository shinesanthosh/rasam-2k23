import styles from '../styles/Navbar.module.scss'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
      <ul className={styles.listDesk}>
        <li>
          <Link href='/'>HOME</Link>
        </li>
        <li>
          <Link href='/about'>ABOUT</Link>
        </li>
        <li>
          <Link href='/events'>EVENTS</Link>
        </li>
        <li>
          <Link href='/procup'>PROCUP</Link>
        </li>
      </ul>
      <ul className={styles.listMob}>
        <li>
          <Link href='/'>
            <i className='bi bi-house-fill'></i>
          </Link>
        </li>
        <li>
          <Link href='/about'>
            <i className='bi bi-info-circle-fill'></i>
          </Link>
        </li>
        <li>
          <Link href='/events'>
            <i className='bi bi-calendar2-event-fill'></i>
          </Link>
        </li>
        <li>
          <Link href='/procup'>
            <i className='bi bi-joystick'></i>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
