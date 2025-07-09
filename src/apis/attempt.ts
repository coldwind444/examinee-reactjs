import type { ApiResponse } from "../models/responses/ApiResponse"
import type { Attempt } from "../models/responses/attempt/Attempt"
import type { Exam } from "../models/responses/exam/Exam"
import type { AttemptSubmitRequest } from "../models/requests/attempt/AttemptSubmitRequest"
import { createApiWithToken } from "./base"

export const getRecent = async (token: string): Promise<ApiResponse<Exam[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/attempts/recent')
    return res.data
}

export const getHistory = async (token: string): Promise<ApiResponse<Exam[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/attempts/history')
    return res.data
}

export const getHistoryByFilters = async (
    token: string,
    sid?: number,
    title?: string
): Promise<ApiResponse<Exam[]>> => {
    const api = createApiWithToken(token)

    const params: any = {}
    if (sid !== undefined) params.sid = sid
    if (title?.trim()) params.title = title.trim()

    const res = await api.get('/attempts/history/filter', { params })
    return res.data
}


export const getAttempts = async (token: string, eid: number): Promise<ApiResponse<Attempt[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/attempts', {
        params: {
            eid: eid
        }
    })
    return res.data
}

export const submit = async (token: string, eid: number, body: AttemptSubmitRequest): Promise<ApiResponse<boolean>> => {
    const api = createApiWithToken(token)
    const res = await api.post('/attempts', body, {
        params: {
            eid: eid
        }
    })
    return res.data
}

export const countDoneExams = async (token: string): Promise<ApiResponse<number>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/attempts/done-exams')
    return res.data
}

export const countAttempts = async (token: string): Promise<ApiResponse<number>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/attempts/total')
    return res.data
}