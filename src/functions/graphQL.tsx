const fetchGraphQL = async (
  operationsDoc: String,
  operationName: String,
  variables: Object
) => {
  const result = await fetch(process.env.HASURA_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_SECRET as string,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  return await result.json()
}

export default fetchGraphQL
