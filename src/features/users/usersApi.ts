import axios, { AxiosError } from "axios"
import { EmailDto, RegistrationError, StudentRegisterDto, User, UserEddit, UserLog, UserProgres } from "./type"
import { Exam } from "../exams/type"


export const registerStudent = async (user: StudentRegisterDto): Promise<string> => {
  try {
    const res = await axios.post(
      `/api/v1/auth/registration-student`,
      {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        numberBook: user.numberBook,
        city: user.city,
        speciality: user.speciality,
        email: user.email,
      },
      { headers: { "Content-Type": "application/json" } },
    )
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const responseData = axiosError.response?.data as RegistrationError
      if (responseData && responseData.errors) {
        const firstErrorKey = Object.keys(responseData.errors)[0]
        throw new Error(
          "Registration failed! " + responseData.errors[firstErrorKey],
        )
      } else {
        throw new Error("Registration failed! Reason unknown")
      }
    } else {
      throw error
    }
  }
}


export async function emailConfirm(emailDto: EmailDto): Promise<User> {
  const res = await axios.get(`/api/v1/users/${emailDto.usersId}/email/${emailDto.mailpass}`, {})
  return res.data
}

export async function loginUser(login: UserLog): Promise<User> {
  try {
    const res = await axios.post(
      `api/v1/auth/login`,
      {
        username: login.username,
        password: login.password,
      },
      {
        headers: { "content-type": "application/json" },
      },
    )
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      throw axiosError.response?.data
    } else {
      throw error
    }
  }
}

export async function userLogout() {
  const res = await axios.get(`/api/v1/auth/logout`, {})
  return res.data
}

export async function fechUserAuth(): Promise<User> {
  const res = await axios.get(`/api/v1/users/me`, {})
  return res.data
}

export async function fechAllUsers(): Promise<User[]> {
  const res = await axios.get(`/api/v1/users/all`, {})
  return res.data
}

export async function fechUserId(userId: string): Promise<User> {
  const res = await axios.get(`/api/v1/users/${userId}`, {})
  console.log(res.data);
  return res.data
}

export async function fechRemoveUserId(userId: string): Promise<User> {
  const res = await axios.delete(`/api/v1/users/${userId}`, {})
  return res.data
}

export async function updateUser(user: UserEddit): Promise<User> {
  const res = await axios.put(
    `/api/v1/users/${user.id}`,
    {
      firstName: user.firstName,
      lastName: user.lastName,
      telefon: user.telefon,
      username: user.username,
      email: user.email,
      numberBook: user.numberBook,
      city: user.city,
      group: user.group,
      speciality: user.speciality,
      image: user.image
    },
    { headers: { "Content-Type": "application/json" } },
  )
  return res.data
}

export let upUsList = (userId: string) => {
  return userId;
}

//SCORE & EXAM

export const eddFechScoreStudent = async (exam: UserProgres): Promise<User> => {
  try {
    const res = await axios.post(
      `/api/v1/users/${exam.userId}/exams/scores`,
      {
        examId: exam.examId,
        exam: exam.exam,
        score: exam.score,
        data: exam.data,
        teacher: exam.teacher
      },
      { headers: { "Content-Type": "application/json" } },
    )
    console.log(res.data);
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const responseData = axiosError.response?.data as RegistrationError
      if (responseData && responseData.errors) {
        const firstErrorKey = Object.keys(responseData.errors)[0]
        throw new Error(
          "Failed! " + responseData.errors[firstErrorKey],
        )
      } else {
        throw new Error("Error!!!")
      }
    } else {
      throw error
    }
  }
}

