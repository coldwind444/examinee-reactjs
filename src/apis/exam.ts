import type { ApiResponse } from "../models/responses/ApiResponse"
import type { Exam } from "../models/responses/exam/Exam"
import type { Subject } from "../models/responses/exam/Subject"
import type { Question } from "../models/responses/question/Question"
import { createApiWithToken } from "./base"

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


/*
    @Post('add')
    @ApiBearerAuth('jwt')
    @UseGuards(AppAuthGuard)
    async addExam(@Req() req, @Body() body : ExamCreateDto) : Promise<ApiResponse<Exam>> {
        const res = await this.examService.addExam(req.user.userid, body)
        return {
            status: 200,
            message: 'Add success.',
            data: res
        }
    }
*/