export const API_ROOT =
  process.env.NEXT_PUBLIC_API_ROOT || 'http://localhost:4000/api/v1'

export const ApiEndpoints = {
  MORTGAGES: API_ROOT + '/blog',
  USERS: API_ROOT + '/users',
}
