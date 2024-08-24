import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { EmailDto, StudentRegisterDto, User, UserEddit, UserLog, UserState } from "./type";
import { emailConfirm, fechAllUsers, fechRemoveUserId, fechUserAuth, fechUserId, loginUser, registerStudent, updateUser, upUsList, userLogout } from "./usersApi";


const initialState: UserState = {
    user: {} as User,
    usersList: [] as User[],
    userID: "",
    errorMessage: "",
    status: "idle",
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: create => ({
        registrationStudentAsync: create.asyncThunk(
            async (studentReg: StudentRegisterDto) => {
                const response = await registerStudent(studentReg)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.userID = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        emailConfirmAsync: create.asyncThunk(
            async (emailDto: EmailDto) => {
                const response = await emailConfirm(emailDto)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        resetError: create.reducer(state => {
            state.errorMessage = ""
        }),
        login: create.asyncThunk(
            async (userLog: UserLog) => {
                const response = await loginUser(userLog)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        logout: create.asyncThunk(
            async () => {
                const response = await userLogout()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: state => {
                    state.user = initialState.user
                    state.status = "idle"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "idle"
                },
            },
        ),
        authUser: create.asyncThunk(
            async () => {
                const response = await fechUserAuth()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
      allUsers: create.asyncThunk(
            async () => {
                const response = await fechAllUsers()
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.usersList = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        getUser: create.asyncThunk(
            async (userId:string) => {
                const response = await fechUserId(userId)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = action.payload
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        removeUser: create.asyncThunk(
            async (userId:string) => {
                const response = await fechRemoveUserId(userId)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.user = {} as User
                    state.status = "success"
                },
                rejected: state => {
                    state.status = "error"
                },
            },
        ),
        editUserAsync: create.asyncThunk(
            async (userEddit: UserEddit) => {
              const response = await updateUser(userEddit)
              return response
            },
            {
              pending: () => {},
              fulfilled: (state, action) => {
                state.user = action.payload
                state.usersList?.splice(0, state.usersList?.length, ...state.usersList?.filter(u => u.id !== action.payload.id))
              },
              rejected: (state, action) => {
                state.errorMessage = action.error.message
              },
            },
          ),
    }),

    selectors: {
        selectUser: state => state.user,
        selectUsersList: state => state.usersList,
        selectUserId: state => state.userID,
        selectError: state => state.errorMessage,
        selectUserStatus: state => state.status,
    },
})
export const { registrationStudentAsync, resetError, emailConfirmAsync, login, logout, authUser, allUsers, getUser, editUserAsync, removeUser } = userSlice.actions
export const { selectUser, selectError, selectUserStatus, selectUserId, selectUsersList } = userSlice.selectors