import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { emailConfirmAsync, selectUser, selectUserId } from '../../features/users/userSlice'
import { EmailDto } from '../../features/users/type';
import { useNavigate } from 'react-router-dom';
import styles from "./Registration.module.css"

const Confirm = () => {
    const navigate = useNavigate()
    const id = useAppSelector(selectUserId)
    const dispatch = useAppDispatch()
    const [code, setCode] = useState('')

    const confMail = async () => {
        const confirmDto: EmailDto = {
            usersId: id!,
            mailpass: code
        }
        console.log(confirmDto);
        const dispatchRes = await dispatch(emailConfirmAsync(confirmDto))
        if (emailConfirmAsync.fulfilled.match(dispatchRes)) {
            navigate("/")
        } else {
            alert("Error!!!")
        }
    }

    return (
        <div className={`${styles.bg_whitebl} container-fluid pt-5 pb-5`}>
            <div className={`container pt-5 pb-5 ${styles.form_out}`}>
                <div className={`col-lg-4 col-sm-12 mx-auto ${styles.form_in}`}>
                    <div className="mb-3 mt-3 p-5">
                        <input type="email" className="form-control" id="email" placeholder="Enter email code" onChange={e => setCode(e.target.value.trim())} />
                        <button type="submit" className="btn btn-primary w-100 mt-4" onClick={confMail}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm