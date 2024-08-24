import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { emailConfirmAsync, registrationStudentAsync, resetError, selectError, selectUser, selectUserStatus } from '../../features/users/userSlice'
import { EmailDto, StudentRegisterDto } from '../../features/users/type'
import { Formik, Form, Field } from "formik"
import styles from "./Registration.module.css"
import { Button } from '@mui/material'

const Register = () => {

  const navigate = useNavigate()
  const [showPwd, setshowPwd] = useState<string>("password")
  // const [isFormMounted, setIsFormMounted] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const userStatus = useAppSelector(selectUserStatus)
  const error = useAppSelector(selectError)
  const id = useAppSelector(selectUser)

  const handleRegistration = async (
    firstname: string,
    lastname: string,
    login: string,
    email: string,
    password: string,
    city: string,
    speciality: string,
    telefon: string
  ) => {
    const user: StudentRegisterDto = {
      firstName: firstname,
      lastName: lastname,
      username: login,
      email: email,
      password: password,
      city: city,
      speciality: speciality,
      telefon: telefon,
      numberBook: ""
    }
    const dispatchRes = await dispatch(registrationStudentAsync(user))
    if (registrationStudentAsync.fulfilled.match(dispatchRes)) {
      navigate("/confirm")
    } else {
      alert("Error!!!")
    }
  }

  function validateEmail(value: string) {
    let error
    if (!value) {
      error = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address"
    }
    return error
  }

  function validateLogin(value: string) {
    if (!/^.{3,10}$/.test(value)) {
      return "Username must be 3-10 characters long"
    }
    if (!/^(?!\d+$).+$/.test(value)) {
      return "Username cannot contain only numbers"
    }
    if (!/.*[a-zA-Z].*/.test(value)) {
      return "Username must contain at least one letter"
    }
    if (!/^(?=.*[a-zA-Z])[\w!$#%]+$/.test(value)) {
      return "Username can only contain letters, numbers and these symbols: !, $, #, %"
    }
    return
  }

  function validateFirstname(value: string) {
    return validateName(value, "First name")
  }

  function validateLastname(value: string) {
    return validateName(value, "Last name")
  }

  function validateName(value: string, field: string) {
    if (!/^.{2,50}$/.test(value)) {
      return field + " must be 2-50 characters long"
    }
    if (!/^[A-Z].*$/.test(value)) {
      return field + " must begin with a capital letter"
    }
    if (!/^[a-zA-Z]+$/i.test(value)) {
      return field + " must contain only letters"
    }
    return
  }

  function validatePassword(value: string) {
    if (!/.*[a-z].*/.test(value)) {
      return "Password must contain at least one lowercase letter"
    }

    if (!/.*[A-Z].*/.test(value)) {
      return "Password must contain at least one uppercase letter"
    }

    if (!/.*[0-9].*/.test(value)) {
      return "Password must contain at least one number"
    }

    if (!/^.{8,50}$/.test(value)) {
      return "Password must be at least 8 characters long"
    }

    if (!/[!$#%]/.test(value)) {
      return "Password must contain at least one of the following symbols: !, $, #, %"
    }
    return
  }

  const pwdToggle = () => {
    if (showPwd === "text") {
      setshowPwd("password")
    } else {
      setshowPwd("text")
    }
  }

  const capitalizeFirstLetter = (value: string) => {
    if (!value) return value
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  useEffect(() => {
    //dispatch(resetError())
    // setIsFormMounted(true);
  }, [dispatch])

  return (
    <div className={`${styles.bg} bg_greenWh pt-5 pb-5`}>
      <div className={`${styles.container} d-flex justify-content-center`}>
        <div
          className={`${styles.logincontainer} col-sm-12 col-lg-8 bg_light `}
        >
          <h2>Welcome !</h2>
          <p>Please complete the registration form</p>
          <p className="forgot d-flex">All fields are required</p>

          {error && <span className="text-danger">{error}</span>}
          <div className="form-container">
            {userStatus === "loading" && (
              <div className="form-overlay">
                <div className="loader">
                  <span
                    className="spinner-border spinner-border-2x me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            )}
            <Formik
              id="form"
              initialValues={{
                firstname: "",
                lastname: "",
                login: "",
                email: "",
                password: "",
                city: "",
                telefon: "",
                speciality: ""
              }}
              onSubmit={values => {
                dispatch(resetError())
                handleRegistration(
                  values.firstname,
                  values.lastname,
                  values.login,
                  values.email,
                  values.password,
                  values.city,
                  values.telefon,
                  values.speciality
                )
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="firstname"
                    validate={validateFirstname}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = capitalizeFirstLetter(e.target.value)
                    }}
                    className={`form-control mt-4 mb-1 ${errors.firstname && touched.firstname ? `${styles.errorShake}` : ""}`}
                    placeholder="First name"
                    id="firstname"
                  />
                  {errors.firstname && touched.firstname && (
                    <span
                      className={`${styles.errorMessage}  text-danger  ml-1`}
                    >
                      {errors.firstname}
                    </span>
                  )}

                  <Field
                    name="lastname"
                    validate={validateLastname}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = capitalizeFirstLetter(e.target.value)
                    }}
                    className={`form-control mt-4 mb-1 ${errors.lastname && touched.lastname ? `${styles.errorShake}` : ""}`}
                    placeholder="Last name"
                    id="lastname"
                  />
                  {errors.lastname && touched.lastname && (
                    <span
                      className={`${styles.errorMessage}  text-danger  ml-1`}
                    >
                      {errors.lastname}
                    </span>
                  )}
                  <Field
                    name="email"
                    onInput={() => dispatch(resetError())}
                    validate={validateEmail}
                    className={`form-control mt-4 mb-1 ${(errors.email && touched.email) || (error && error?.indexOf("email") > 0) ? `${styles.errorShake}` : ""}`}
                    placeholder="Email"
                    id="email"
                  />
                  {errors.email && touched.email && (
                    <span
                      className={`${styles.errorMessage}  text-danger  ml-1`}
                    >
                      {errors.email}
                    </span>
                  )}
                  <Field
                    name="login"
                    validate={validateLogin}
                    onInput={() => dispatch(resetError())}
                    className={`form-control mt-4 mb-1 ${(errors.login && touched.login) || (error && error?.indexOf("username") > 0) ? `${styles.errorShake}` : ""}`}
                    placeholder="Username"
                    id="login"
                  />
                  {errors.login && touched.login && (
                    <span
                      className={`${styles.errorMessage}  text-danger  ml-1`}
                    >
                      {errors.login}
                    </span>
                  )}
                  <Field
                    name="telefon"
                    onInput={() => dispatch(resetError())}
                    className={`form-control mt-4 mb-1 ${(errors.telefon && touched.telefon) || (error && error?.indexOf("telefon") > 0) ? `${styles.errorShake}` : ""}`}
                    placeholder="telefon"
                    id="telefon"
                  />
                  {errors.telefon && touched.telefon && (
                    <span
                      className={`${styles.errorMessage}  text-danger  ml-1`}
                    >
                      {errors.telefon}
                    </span>
                  )}
                  <Field
                    name="city"
                    onInput={() => dispatch(resetError())}
                    className={`form-control mt-4 mb-1 ${(errors.city && touched.city) || (error && error?.indexOf("city") > 0) ? `${styles.errorShake}` : ""}`}
                    placeholder="City"
                    id="city"
                  />
                  {errors.city && touched.city && (
                    <span
                      className={`${styles.errorMessage}  text-danger  ml-1`}
                    >
                      {errors.city}
                    </span>
                  )}
                  <Field
                    name="speciality"
                    onInput={() => dispatch(resetError())}
                    className={`form-control mt-4 mb-1 ${(errors.speciality && touched.speciality) || (error && error?.indexOf("speciality") > 0) ? `${styles.errorShake}` : ""}`}
                    placeholder="Speciality"
                    id="speciality"
                  />
                  {errors.city && touched.city && (
                    <span
                      className={`${styles.errorMessage}  text-danger  ml-1`}
                    >
                      {errors.city}
                    </span>
                  )}
                  <Field
                    name="password"
                    validate={validatePassword}
                    className={`form-control mt-4 mb-1 ${errors.password && touched.password ? `${styles.errorShake}` : ""}`}
                    placeholder="Password"
                    type={showPwd}
                    id="password"
                  />
                  {errors.password && touched.password && (
                    <span
                      className={`${styles.errorMessage}  text-danger  ml-1`}
                    >
                      {errors.password}
                    </span>
                  )}
                  <p className={`${styles.showpass} mt-2`}>
                    <input
                      type="checkbox"
                      className="w3-check m-1"
                      onClick={pwdToggle}
                      id={styles.checkbox}
                    />{" "}
                    Show password
                  </p>

                  <button type="submit">Registration</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register