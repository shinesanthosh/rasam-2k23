import {
  tokenResponseType,
  vipRegistrationResponseType,
} from '@/types/apiTypes'
import fetchGraphQL from './graphQL'

const insertReg = async (
  coupon: string,
  unique_id: string,
  email: string
): Promise<tokenResponseType> => {
  const operationsDoc = `mutation insertReg($coupon: String!, $email: String!, $unique_id: String!) {
  insert_vip_registrations_one(object: {coupon: $coupon, email: $email, unique_id: $unique_id}) {
    coupon
    email
    id
    unique_id
  }
  update_coupons_by_pk(pk_columns: {unique_id: $unique_id}, _set: {used: true}) {
    coupon
    unique_id
    used
  }
}
`

  try {
    const res: vipRegistrationResponseType = await fetchGraphQL(
      operationsDoc,
      'insertReg',
      {
        coupon,
        unique_id,
        email,
      }
    )

    if (res.errors?.some((e) => e.message.includes('Uniqueness violation'))) {
      return {
        code: 400,
        status: 'error',
        message: 'Email or coupon already used',
      }
    } else if (
      res.data.insert_vip_registrations_one?.unique_id == unique_id &&
      res.data.update_coupons_by_pk?.used
    ) {
      return { code: 200, message: 'Successfully added', status: 'success' }
    } else {
      console.log('Verification error: ', res)
      return {
        code: 500,
        status: 'error',
        message: 'Some error occured while verfication',
      }
    }
  } catch (e) {
    console.log('Error while inserting new reg: ', e)
    return {
      code: 500,
      status: 'error',
      message: 'Error occured while insertion',
    }
  }
}

export default insertReg
