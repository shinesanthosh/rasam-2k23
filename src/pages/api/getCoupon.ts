import type { NextApiRequest, NextApiResponse } from 'next'
import {
  errorResponseType,
  getTokenType,
  tokenQueryType,
  tokenResponseType,
} from '@/types/apiTypes'

import getToken from '@/functions/getToken'
import insertReg from '@/functions/insertReg'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let responseObject: tokenResponseType

  const reqBody = JSON.parse(req.body)

  console.log('got a query', req.method, reqBody)
  if (
    (reqBody as tokenQueryType).coupon == undefined ||
    (reqBody as tokenQueryType).email == undefined
  )
    responseObject = { code: 400, message: 'Invalid Query', status: 'error' }
  else {
    const token = await getToken(reqBody.coupon)
    if ('status' in token && token.status == 'error') {
      responseObject = { code: 500, message: token.message, status: 'error' }
    } else {
      console.log(token)
      const insertResponse = await insertReg(
        (token as getTokenType).coupon,
        (token as getTokenType).unique_id,
        reqBody.email,
        reqBody.name
      )
      if (insertResponse.status == 'success')
        responseObject = { code: 200, message: 'Success', status: 'success' }
      else responseObject = insertResponse
    }
  }

  res.status(responseObject.code).json(responseObject)
}

export default handler
