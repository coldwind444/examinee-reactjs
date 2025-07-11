import type { ApiResponse } from "../models/responses/ApiResponse"
import type { Exam } from "../models/responses/exam/Exam"
import type { Subject } from "../models/responses/exam/Subject"
import type { Question } from "../models/responses/question/Question"
import { createApiWithToken, createFormApiWithToken } from "./base"

export const getAllExam = async (token: string): Promise<ApiResponse<Exam[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/exams')
    return res.data
}

export const getAllSubs = async (token: string): Promise<ApiResponse<Subject[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/exams/subjects')
    return res.data
}

export const getMyExam = async (token: string): Promise<ApiResponse<Exam[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/exams/my-exams')
    return res.data
}

export const getExamsByFilters = async (
    token: string,
    sid?: number,
    title?: string
): Promise<ApiResponse<Exam[]>> => {
    const api = createApiWithToken(token)

    const params: any = {}
    if (sid !== undefined) params.sid = sid
    if (title?.trim()) params.title = title.trim()

    const res = await api.get('/exams/filter', { params })
    return res.data
}


export const getMyExamsByFilters = async (
    token: string,
    sid?: number,
    title?: string
): Promise<ApiResponse<Exam[]>> => {
    const api = createApiWithToken(token)

    const params: any = {}
    if (sid) params.sid = sid
    if (title?.trim()) params.title = title.trim()

    const res = await api.get('/exams/my-exams/filter', { params })
    return res.data
}


export const getExamQuestions = async (token: string, eid: number): Promise<ApiResponse<Question[]>> => {
    const api = createApiWithToken(token)
    const res = await api.get('/exams/questions', {
        params: {
            eid: eid
        }
    })
    return res.data
}

export const uploadExamViaExcel = async (token: string, formData: FormData) : Promise<ApiResponse<Exam>> => {
    const api = createFormApiWithToken(token)
    const res = await api.post('/exams/upload-excel', formData)
    return res.data
}