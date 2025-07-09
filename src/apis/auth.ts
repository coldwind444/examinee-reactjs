import type { LoginRequest } from "../models/requests/auth/LoginRequest";
import type { ApiResponse } from "../models/responses/ApiResponse";
import type { TokenResponse } from "../models/responses/auth/TokenResponse";
import type { OtpConfirmRequest } from "../models/requests/auth/OtpConfirmRequest";
import type { ResetPasswordRequest } from "../models/requests/auth/ResetPasswordRequest";
import type { OtpResponse } from "../models/responses/auth/OtpResponse";
import { createApiWithToken } from "./base";
import { baseApi } from "./base";

export const login = async (req : LoginRequest) : Promise<ApiResponse<TokenResponse>> => {
    const res = await baseApi.post('/auth/login', req)
    return res.data
}

export const logout = async (token: string) : Promise<ApiResponse<boolean>> => {
    const api = createApiWithToken(token)
    const res = await api.post('/auth/logout')
    return res.data
}

export const refreshToken = async (token: string, refresh: boolean) : Promise<ApiResponse<TokenResponse>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/auth/refresh-token', {
        params: {
            refresh: refresh
        }
    })
    return res.data
}

export const requestOtp = async (email: string) : Promise<ApiResponse<OtpResponse>> => {
    const res = await baseApi.get('/auth/otp-request', {
        params: {
            email: email
        }
    })
    return res.data
}

export const confirmOtp = async (req: OtpConfirmRequest) : Promise<ApiResponse<string>> => {
    const res = await baseApi.post('/auth/otp-confirm', req)
    return res.data
}

export const resetPassword = async (req: ResetPasswordRequest) : Promise<ApiResponse<boolean>> => {
    const res = await baseApi.post('/auth/reset-password', req)
    return res.data
}