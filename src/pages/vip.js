import React, { useState } from 'react'

const Vip = () => {
  const [coupon, setCoupon] = useState('')
  const [email, setEmail] = useState('')
  const [responseMessage, setResponseMessage] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/getCoupon', {
      method: 'POST',
      body: JSON.stringify({ coupon, email }),
    })

    const data = await res.json()
    if (data.status == 'error') setResponseMessage(data.message)
    else if (data.status == 'success') {
      setResponseMessage("Your ticket is reserved ")
      setCoupon('')
      setEmail('')
    }
  }

  return (
    <div>
      <label>Coupon Code:</label>
      <input
        type='text'
        name='coupon'
        value={coupon}
        onChange={e => setCoupon(e.target.value)}
      />
      <label>Email</label>
      <input
        type='email'
        name='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={() => handleSubmit()}>Get ticket</button>
      <span>{responseMessage}</span>
    </div>
  )
}

export default Vip
