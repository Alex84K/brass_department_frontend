import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  login,
  resetError,
  selectError,
  selectUserStatus,
} from "../../features/users/userSlice"

import styles from "./Login.module.css"
import { Button } from "@mui/material"

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPwd, setshowPwd] = useState<string>("password")
    const dispatch = useAppDispatch()
    const error = useAppSelector(selectError)
    const userStatus = useAppSelector(selectUserStatus)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
    const [usernameError, setUsernameError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
  
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
      dispatch(resetError())
      e.preventDefault()
      setIsButtonDisabled(true)
      const userLogin = {
        username: username,
        password: password,
      }
  
      const dispatchRes = await dispatch(login(userLogin))
      setIsButtonDisabled(false)
      if (login.fulfilled.match(dispatchRes)) {
        navigate("/cabinet")
      }
    }
  
    const pwdToggle = () => {
      if (showPwd === "text") {
        setshowPwd("password")
      } else {
        setshowPwd("text")
      }
    }
  
    const handleUsernameBlur = () => {
      if (username.trim() === "") {
        setUsernameError("Username cannot be empty")
      } else {
        setUsernameError("")
      }
    }
  
    const handlePasswordBlur = () => {
      if (password.trim() === "") {
        setPasswordError("Password cannot be empty")
      } else {
        setPasswordError("")
      }
    }
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(resetError())
      const { name, value } = event.target
      if (name === "login") {
        setUsername(value)
        setUsernameError("")
      } else {
        setPassword(value)
        setPasswordError("")
      }
      updateButtonState(
        name === "login" ? value : username,
        name === "pswd" ? value : password,
      )
    }
  
    const updateButtonState = (value1: string, value2: string) => {
      if (value1.trim() !== "" && value2.trim() !== "") {
        setIsButtonDisabled(false)
      } else {
        setIsButtonDisabled(true)
      }
    }
  
  
    return (
      <div className={`${styles.bg_whitebl} `}>
        <div className={`${styles.container} d-flex justify-content-center`}>
          <div
            className={`${styles.loginPanel} ${styles.logincontainer} ${styles.form_box} col-sm-12 col-lg-8 bg_light`}
          >
            <h2>Welcome Back!</h2>
            <p>Please enter your username and password below</p>
  
            {/*error && <span className="text-danger">{error}</span>*/}
  
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
              <form onSubmit={handleLogin} className="mb-5" id="form">
                <input
                  type="text"
                  value={username}
                  onChange={handleInputChange}
                  onBlur={handleUsernameBlur}
                  placeholder="Enter username"
                  className={`form-control mt-4 mb-1 ${usernameError ? "error-shake" : ""}`}
                  id="login"
                  name="login"
                />
                {usernameError && (
                  <span className="text-danger error-message ml-1">
                    {usernameError}
                  </span>
                )}
                <input
                  type={showPwd}
                  value={password}
                  onChange={handleInputChange}
                  onBlur={handlePasswordBlur}
                  className={`form-control mt-4 mb-1 ${passwordError ? "error-shake" : ""}`}
                  id="pwd"
                  placeholder="Enter password"
                  name="pswd"
                />
                {passwordError && (
                  <span className="text-danger error-message">
                    {passwordError}
                  </span>
                )}
                <p className="mt-2 showpass">
                  <input
                    type="checkbox"
                    className={`${styles.checkbox} w3-check m-1`}
                    onClick={pwdToggle}
                    id="checkbox"
                  />{" "}
                  Show password
                </p>
                <Button variant="contained"
                color="warning"
                  type="submit"
                  className="w-100 btnGreen mt-4"
                  id="submit"
                  disabled={isButtonDisabled}
                >
                  Sign in
                </Button>
              </form>
            </div>
            <Link to="/login-reload" className={styles.forgot} id="forgot">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    )
  }

export default Login