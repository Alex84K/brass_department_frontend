import { createAppSlice } from "../../app/createAppSlice";
import { addExamGlobal, editExam, getAllExams, removeExam } from "./examsApi";
import { EditExam, Exam, ExamState, NewExam } from "./type";


const initialState: ExamState = {
    exam: {} as Exam,
    examsList: [] as Exam[],
    errorMessage: "",
    status: "idle",
}

export const examSlice = createAppSlice({
    name: "exam",
    initialState,
    reducers: create => ({
        createExam: create.asyncThunk(
            async (newExam: NewExam) => {
                const response = await addExamGlobal(newExam)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.exam = action.payload
                    state.examsList?.push(action.payload)
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        deleteExam: create.asyncThunk(
            async (examId: string) => {
                const response = await removeExam(examId)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.exam = {} as Exam
                    state.examsList?.splice(0, state.examsList?.length, ...state.examsList?.filter(e => e.id !== action.payload.id))
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        updateExam: create.asyncThunk(
            async (exam: EditExam) => {
                const response = await editExam(exam)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.exam = action.payload
                    state.examsList?.splice(0, state.examsList?.length, ...state.examsList?.filter(e => e.id !== action.payload.id))
                    state.examsList?.push(action.payload)
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        allExams: create.asyncThunk(
            async () => {
                const response = await getAllExams()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.examsList = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
    }),
    selectors: {
        selectExam: state => state.exam,
        selectExamsList: state => state.examsList,
        selectError: state => state.errorMessage,
        selectUserStatus: state => state.status,
    },
})
export const { createExam, allExams, deleteExam, updateExam } = examSlice.actions
export const { selectExam, selectError, selectUserStatus, selectExamsList } = examSlice.selectors