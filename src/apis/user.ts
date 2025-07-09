import type { UserRegisterRequest } from "../models/requests/user/UserRegisterRequest"
import type { ApiResponse } from "../models/responses/ApiResponse"
import type { UserResponse } from "../models/responses/user/UserResponse"
import { createApiWithToken } from "./base"
import baseApi from "./base"

export const userRegister = async (req : UserRegisterRequest) : Promise<ApiResponse<boolean>>  => {
    const res = await baseApi.post('/users/register', req)
    return res.data
}

export const getUserProfile = async (token: string) : Promise<ApiResponse<UserResponse>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/users/profile')
    return res.data
}
