import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from '../styles/Login.module.scss'
import SEO from '../components/SEO'

const Vip = () => {
  const [coupon, setCoupon] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  const handleSubmit = async () => {
    const regex = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,6})$/
    if (
      regex.test(email) &&
      (coupon != null || undefined || '') &&
      (name != null || undefined || '')
    ) {
      const res = await fetch('/api/getCoupon', {
        method: 'POST',
        body: JSON.stringify({ coupon, email, name }),
      })

      const data = await res.json()
      if (data.status == 'error') setResponseMessage(data.message)
      else if (data.status == 'success') {
        setResponseMessage('Your ticket is reserved ')
        setCoupon('')
        setEmail('')
        setName('')
      }
    } else {
      setResponseMessage('Invalid details')
    }
  }

  return (
    <>
      <SEO
        title='RASAM VIP PASS'
        description='Get your VIP pass for RASAM 2k23'
      />
      <main className={styles.loginMain}>
        <div className={styles.loginMask}>
          <div className={styles.form}>
            <h1>RASAM VIP PASS</h1>
            <FloatingLabel
              controlId='floatingInput'
              label='Enter your name'
              className={styles.formInput}>
              <Form.Control
                type='text'
                placeholder='Your Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingInput'
              label='Email'
              className={styles.formInput}>
              <Form.Control
                type='email'
                placeholder='someon@example.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingInput'
              label='Coupon Code'
              className={styles.formInput}>
              <Form.Control
                type='text'
                placeholder='Coupon Code'
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
              />
            </FloatingLabel>
            <Button
              variant='primary'
              className={styles.loginBtn}
              onClick={() => handleSubmit()}>
              Book Ticket
            </Button>{' '}
            {/* <label>Coupon Code:</label>
          <input
            type="text"
            name="coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
            {/* <button onClick={() => handleSubmit()}>Get ticket</button> */}
            <span>{responseMessage}</span>
          </div>
        </div>
      </main>
    </>
  )
}

export default Vip
