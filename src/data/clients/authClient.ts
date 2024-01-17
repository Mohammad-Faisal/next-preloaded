import { QueryOptions, User } from '@/constants/types'
import { crudFactory } from '@/lib/crud-factory'

import { ApiEndpoints } from '@/constants/api'
import HttpClient from '@/lib/http-client'

export interface CreatePropertyInput {}

export const authClient = {
  ...crudFactory<User, QueryOptions, CreatePropertyInput>(ApiEndpoints.SIGNUP),
  signUp: (user: any) => {
    return HttpClient.post<any>(ApiEndpoints.SIGNUP, user)
  },
  signIn: (user: any) => {
    return HttpClient.post<any>(ApiEndpoints.SIGNIN, user)
  },
  getUserDetails: () => {
    return HttpClient.get<User>(ApiEndpoints.USER)
  },
  forgotPassword: (data: { email: string }) => {
    return HttpClient.post<any>(ApiEndpoints.FORGOT_PASSWORD, data)
  },
  resetPassword: (data: { resetPasswordToken: string; newPassword: string; confirmNewPassword: string }) => {
    return HttpClient.post<any>(ApiEndpoints.RESET_PASSWORD, data)
  }
}
