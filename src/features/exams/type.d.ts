export interface Exam {
    id: string,
    examName: string,
    group: string,
    teacher: string,
    dataCreated: string
}

export interface NewExam {
    examName: string,
    group: string,
    teacher: string
}

export interface EditExam {
    id: string,
    examName: string,
    group: string,
    teacher: string
}

export interface EditExamScore {
    userId: string,
    examId: string,
    exam: string,
    score: number,
    data: string,
    teacher: string
}

export interface ExamState {
    exam?: Exam,
    examsList?: Exam[],
    errorMessage?: string,
    status?: string,
}