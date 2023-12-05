export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}
export interface QueryOptions {
  language: string
  limit?: number
  page?: number
  orderBy?: string
  sortedBy?: SortOrder
}

export interface SuccessResponse<T> {
  data: T
  message: string
  statusCode: number
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  role: string
  isEmailConfirmed: boolean
}
