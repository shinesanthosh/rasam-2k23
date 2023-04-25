export interface tokenQueryType {
  email: string
  coupon: string
  name: string
}

export interface tokenResponseType {
  status: 'success' | 'error'
  message: string
  code: number
}

export interface getTokenType {
  unique_id: string
  used: boolean
  coupon: string
}

export interface errorResponseType {
  status: 'error'
  message: string
}

export interface vipRegistrationResponseType {
  errors: [{ extensions: object; message: string }]
}

export interface vipRegistrationResponseType {
  data: {
    insert_vip_registrations_one: {
      coupon: string
      email: string
      id: number
      unique_id: string
    }
    update_coupons_by_pk: {
      coupon: string
      unique_id: string
      used: boolean
    }
  }
}
