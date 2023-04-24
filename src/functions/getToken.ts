import { errorResponseType, getTokenType } from '@/types/apiTypes'
import fetchGraphQL from './graphQL'

const getToken = async (
  coupon: string
): Promise<errorResponseType | getTokenType> => {
  const operationsDoc = `query getTokens($coupon: String!) {
        coupons(limit: 1, where: {coupon: {_eq: $coupon}, used: {_eq: false}}) {
          coupon
          unique_id
          used
        }
      }
      `

  let responseObject: errorResponseType | getTokenType = {
    status: 'error',
    message: 'Execution error',
  }
  
  try {
    const res = await fetchGraphQL(operationsDoc, 'getTokens', {
      coupon: coupon,
    })
    if (res.data.coupons.length > 0) {
      responseObject = res.data.coupons[0]
    } else {
      responseObject = { status: 'error', message: 'Coupon not found' }
    }
  } catch (e) {
    console.error('Log: Error from getting token: ', e)
    responseObject = { status: 'error', message: 'Error in getting token' }
  }

  return responseObject
}

export default getToken
