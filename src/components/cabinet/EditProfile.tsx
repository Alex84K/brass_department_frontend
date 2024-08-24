import { Field, Form, Formik } from "formik"
import Button from '@mui/material/Button';
import { orange, red } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom'
import { User, UserEddit } from "../../features/users/type"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { editUserAsync, selectUser } from "../../features/users/userSlice"
import styles from "./Cabinet.module.css"

const EditProfile = () => {
    const { userId } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user: User | undefined = useAppSelector(selectUser)

    function handleEdditProfile(firstname: string, lastname: string, telefon: string, username: string, email: string, city: string, image: string) {
        const usUp: UserEddit = {
            id: user?.id,
            firstName: firstname,
            lastName: lastname,
            telefon: telefon,
            username: username,
            email: email,
            numberBook: user?.numberBook,
            city: city,
            group: user?.group,
            speciality: user?.speciality,
            image: image
        }
        dispatch(editUserAsync(usUp))
        navigate('/cabinet')
    }

    function validateFirstname(value: string) {
        let error
        if (value === "admin") {
            error = "Nice try!"
        } else if (!/^[a-zA-Z]+$/i.test(value)) {
            error = "Name must contain only letters"
        }
        return error
    }

    function validateLastname(value: string) {
        let error
        if (value === "admin") {
            error = "Nice try!"
        } else if (!/^[a-zA-Z]+$/i.test(value)) {
            error = "Name must contain only letters"
        }
        return error
    }

    return (
        <div className={`${styles.bg_457B9D} container-fluid`}>
            <div className={`${styles.container_in} container`}>
                <div className={`row col-lg-6 col-sm-12 mx-auto ${styles.form_box}`}>
                    <Formik
                        id="form"
                        initialValues={{
                            firstname: '',
                            lastname: "",
                            telefon: '',
                            username: '',
                            email: '',
                            numberBook: '',
                            city: '',
                            group: '',
                            speciality: '',
                            image: ''
                        }}
                        onSubmit={values => {
                            // same shape as initial values
                            handleEdditProfile(values.firstname, values.lastname, values.telefon, values.username, values.email, values.city, values.image)
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <label className='mt-2'>First Name</label>
                                <Field
                                    name="firstname"
                                    validate={validateFirstname}
                                    className="form-control mt-2"
                                    placeholder={user?.firstName}
                                    id="firstname"
                                />
                                {errors.firstname && touched.firstname && (
                                    <p className="mt-4 txtRed">{errors.firstname}</p>
                                )}
                                <label className='mt-2'>Last Name</label>
                                <Field
                                    name="lastname"
                                    validate={validateLastname}
                                    className="form-control mt-2"
                                    placeholder={user?.lastName}
                                    id="lastname"
                                />
                                {errors.lastname && touched.lastname && (
                                    <p className="mt-4 txtRed">{errors.lastname}</p>
                                )}
                                <label className='mt-2'>Number tel.</label>
                                <Field
                                    name="telefon"
                                    className="form-control mt-2"
                                    placeholder={user?.telefon}
                                    id="telefon"
                                />
                                <label className='mt-2'>Username</label>
                                <Field
                                    name="username"
                                    className="form-control mt-2"
                                    placeholder={user?.username}
                                    id="username"
                                />
                                <label className='mt-2'>Email</label>
                                <Field
                                    name="email"
                                    className="form-control mt-2"
                                    placeholder={user?.email}
                                    id="email"
                                />
                                <label className='mt-2'>City</label>
                                <Field
                                    name="city"
                                    className="form-control mt-2"
                                    placeholder={user?.city}
                                    id="city"
                                />
                                <Button variant="contained" className="w-100 btnGreen mt-5 mb-3" type="submit" sx={{ background: orange[500] }} id="submit">Edit</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default EditProfile