
export interface User {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  email: string,
  telefon?: string,
  numberBook: string,
  city: string,
  group: string,
  speciality: string,
  codeForEmail: string,
  image: string,
  dateRegistered: string,
  roles: string[],
  progres: UserProgres[],
  materials: Material[],
  examsFlags: ExamFlag[],
  isEmailConfirmed: boolean
}

export interface Material {
  id: string,
  title: string,
  tags: string[],
  publisher: string,
  link: string,
  dateCreated: string
}


export interface UserState {
  user?: User;
  usersList?: User[];
  userID?: string;
  errorMessage?: string;
  role?: string;
  status?: 'idle' | 'loading' | 'success' | 'error'
}

export interface StudentRegisterDto {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  numberBook?: string,
  city: string,
  speciality: string,
  email: string,
  telefon?: string
}

export interface RegistrationError {
  message?: string
  errors?: {
    [key: string]: string;
  }
}

export interface EmailDto {
  usersId: string,
  mailpass: string
}

export interface UserLog {
  username: string;
  password: string;
}

export interface UserEddit {
  id: strin
  firstName: string
  lastName: string
  telefon: string
  username: string
  email: string
  numberBook?: string
  city: string
  group?: string
  speciality?: string
  image?: string
}

export interface UserProgres {
  userId: string
  examId: string,
  exam: string,
  score: number,
  data: string,
  teacher: string
}

export interface ExamFlag {
  examId: string
  exam: string
  score: 0
  data: string
  teacher: string
}