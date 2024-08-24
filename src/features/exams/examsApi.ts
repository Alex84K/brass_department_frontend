import axios, { AxiosError } from "axios"
import { EditExam, Exam, NewExam } from "./type"


export const addExamGlobal = async (exam: NewExam): Promise<Exam> => {
    try {
        const res = await axios.post(
            `/api/v1/exams`,
            {
                examName: exam.examName,
                group: exam.group,
                teacher: exam.teacher
            },
            { headers: { "Content-Type": "application/json" } },
        )
        return res.data
    } catch (error) {
        throw new Error("Registration failed! Reason unknown")

    }
}

export const getAllExams = async (): Promise<Exam[]> => {
    try {
        const res = await axios.get(
            `/api/v1/exams/all`,
        )
        return res.data
    } catch (error) {
        throw new Error("Registration failed! Reason unknown")

    }
}

export const removeExam = async (examId: string): Promise<Exam> => {
    try {
        const res = await axios.delete(
            `/api/v1/exams/${examId}`,
        )
        return res.data
    } catch (error) {
        throw new Error("Registration failed! Reason unknown")

    }
}

export const editExam = async (exam: EditExam): Promise<Exam> => {
    try {
        const res = await axios.put(
            `/api/v1/exams/${exam.id}`,
            {
                examName: exam.examName,
                group: exam.group,
                teacher: exam.teacher
            },
            { headers: { "Content-Type": "application/json" } },
        )
        return res.data
    } catch (error) {
        throw new Error("Registration failed! Reason unknown")

    }
}
