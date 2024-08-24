import axios, { AxiosError } from "axios"
import { User } from "../../../features/users/type"
import { EditExamScore } from "../../../features/exams/type"

export async function fechRemoveExamScoreUser(userId: string, examId: string): Promise<User> {
    const res = await axios.delete(`/api/v1/users/${userId}/exams/scores/${examId}`, {})
    return res.data
}

export async function fechRemoveExamFlagUser(userId: string, examId: string): Promise<User> {
    const res = await axios.delete(`/api/v1/users/${userId}/exams/${examId}`, {})
    return res.data
}

export async function fechEditExamUser(examEditDto: EditExamScore): Promise<User> {
    const res = await axios.put(`/api/v1/users/${examEditDto.userId}/exams/scores`,
        {
            examId: examEditDto.examId,
            exam: examEditDto.exam,
            score: examEditDto.score,
            data: examEditDto.data,
            teacher: examEditDto.teacher
        },
        { headers: { "Content-Type": "application/json" } },
    )
    return res.data
}