import React, { createContext, useContext, useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import { allUsers, editUserAsync, getUser, removeUser, selectUser, selectUsersList } from '../../features/users/userSlice'
import { useNavigate } from "react-router-dom"
import { Field, Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Admin.module.css"
import { Material, User, UserEddit, UserProgres } from '../../features/users/type'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { eddFechScoreStudent, updateUser } from '../../features/users/usersApi'
import { EditExamScore, Exam } from '../../features/exams/type'
import { orange, red } from '@mui/material/colors';
import { StyledTableCell, StyledTableRow } from './Content'
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { allExams, selectExamsList } from '../../features/exams/examsSlice'
import { fechEditExamUser, fechRemoveExamFlagUser, fechRemoveExamScoreUser } from './utils/adminApi'

const EditUserPrifileAdmin = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useAppDispatch()
    const UserContext = createContext<User | undefined | null>({} as User);
    const userList = useAppSelector(selectUsersList)
    const examList = useAppSelector(selectExamsList)
    const [user, setUser] = useState({} as User)

    const [editFlag, setEditFlag] = useState(false)
    const [materials, setMaterials] = useState<Material[]>([])
    const [exams, setExamsFlag] = useState<Exam[]>([])

    const [exam, setExam] = useState('');

    const handleAddScore = () => { }
    const handleRemoveScore = (uId: string, eId: string) => {
        fechRemoveExamScoreUser(uId, eId).then(res => setUser(res))
    }

    const [openAddScore, setOpenAddScore] = useState(false);
    const handleOpenAddScore = () => { setOpenAddScore(true) };
    const handleCloseAddScore = () => { setOpenAddScore(false) };

    const handleEditScore = () => { }

    const [openEditScore, setOpenEditScore] = useState(false);
    const handleOpenEditScore = () => { setOpenEditScore(true) };
    const handleCloseEditScore = () => { setOpenEditScore(false) };

    const handleEditExamscore = (examId: string) => {
        setExam(examId)
        handleOpenEditScore()
    }

    const handleChange = (idEx: string) => {
        setExam(idEx);
        handleOpenAddScore();
    };
    const removeExamFlag = (uId: string, eId: string) => {
        fechRemoveExamFlagUser(uId, eId).then(res => setUser(res))
    }

    

    function handleEdditProfile(firstname: string, lastname: string, telefon: string, username: string, email: string, numberBook: string, city: string, group: string, speciality: string, image: string) {
        const usUp: UserEddit = {
            id: userId,
            firstName: firstname,
            lastName: lastname,
            telefon: telefon,
            username: username,
            email: email,
            numberBook: numberBook,
            city: city,
            group: group,
            speciality: speciality,
            image: image
        }
        updateUser(usUp).then((data: any) => {
            setUser(data)
        })
        setEditFlag(false)
        dispatch(allUsers())
        editToggle()
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

    const editToggle = () => {
        if (editFlag) {
            setEditFlag(false)
        } else {
            setEditFlag(true)
        }
    }

    const rmUser = () => {
        dispatch(removeUser(String(userId)))
        navigate('/admin')
    }

    useEffect(() => {
        let res = userList?.filter(u => u.id === userId)
        if (res != undefined) {
            setUser(res[0])
        }
        dispatch(allExams())
    }, [])

    return (
        <UserContext.Provider value={user}>
            <div className='bg_whitebl pt-5 pb-5'>
                <div className='container '>
                    <div className='row col-sm-12 d-flex justify-content-between'>
                        <div className={`row col-lg-6 col-sm-12 p-5 d-flex justify-content-between ${styles.infoBox}`}>
                            <div className='row col-lg-12 col-sm-12'>
                                <h2>{user?.firstName} {user?.lastName}</h2>
                                <p>{user?.city}</p>
                                <p>{user?.dateRegistered}</p>
                                <p>{user?.email}</p>
                                <p>{user?.numberBook}</p>
                                <p>{user?.group}</p>
                                <p>{user?.speciality}</p>
                                <p>{user?.roles}</p>
                                <p>{user?.username}</p>
                                <ul>
                                    {user?.examsFlags !== undefined ? (<p>{Object.entries(user.examsFlags).map(([key, v]) => <li key={key}>{v.exam} | {v.data} | {v.teacher} | <ModeEditIcon sx={{ color: orange[500] }} className={`${styles.cursor_p}`} onClick={() => handleChange(v.examId)} /> | <DeleteIcon sx={{ color: red[500] }} className={`${styles.cursor_p}`} onClick={() => removeExamFlag(user.id, v.examId)} /></li>)}</p>) : (<p></p>)}
                                </ul>
                                {user?.materials !== undefined ? (<ul>{user.materials.length}</ul>) : (<p></p>)}
                            </div>

                            <Button variant="contained" sx={{ background: orange[500] }} className='mb-3' onClick={editToggle}>Edit</Button>
                            <Button variant="contained" sx={{ background: red[500] }} onClick={rmUser}>Delte</Button>
                        </div>

                        {/* RIGHT*/}
                        <div className={`row col-lg-6 col-sm-12 ${styles.infoBox}`}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Exam</StyledTableCell>
                                            <StyledTableCell align="right">Score</StyledTableCell>
                                            <StyledTableCell align="right">Data</StyledTableCell>
                                            <StyledTableCell align="right">Teacher</StyledTableCell>
                                            <StyledTableCell align="right">Edit score</StyledTableCell>
                                            <StyledTableCell align="right">Delete</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {user?.progres !== undefined ? (Object.entries(user.progres).map(([key, v]) =>
                                            <StyledTableRow key={v.examId} onClick={() => console.log(v)}>
                                                <StyledTableCell component="th" scope="row">{v.exam}</StyledTableCell>
                                                <StyledTableCell align="right">{v.score}</StyledTableCell>
                                                <StyledTableCell align="right">{v.data}</StyledTableCell>
                                                <StyledTableCell align="right">{v.teacher}</StyledTableCell>
                                                <StyledTableCell align="right"><ModeEditIcon sx={{ color: orange[500] }} className={`${styles.cursor_p}`} onClick={
                                                    () => handleEditExamscore(v.examId)} /></StyledTableCell>
                                                <StyledTableCell align="right"><DeleteIcon sx={{ color: red[500] }} className={`${styles.cursor_p}`} onClick={() => handleRemoveScore(user.id, v.examId)} /></StyledTableCell>
                                            </StyledTableRow>
                                        )) : (<></>)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>

                {editFlag ? (<div className={`row col-lg-6 col-sm-12 mx-auto p-5 ${styles.infoBox}`}>
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
                            handleEdditProfile(values.firstname, values.lastname, values.telefon, values.username, values.email, values.numberBook, values.city, values.group, values.speciality, values.image)
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
                                <label className='mt-2'>Number book</label>
                                <Field
                                    name="numberBook"
                                    className="form-control mt-2"
                                    placeholder={user?.numberBook}
                                    id="numberBook"
                                />
                                <label className='mt-2'>City</label>
                                <Field
                                    name="city"
                                    className="form-control mt-2"
                                    placeholder={user?.city}
                                    id="city"
                                />
                                <label className='mt-2'>Group</label>
                                <Field
                                    name="group"
                                    className="form-control mt-2"
                                    placeholder={user?.group}
                                    id="group"
                                />
                                <label className='mt-2'>Speciality</label>
                                <Field
                                    name="speciality"
                                    className="form-control mt-2"
                                    placeholder={user?.speciality}
                                    id="speciality"
                                />
                                <Button variant="contained" className="w-100 btnGreen mt-5 mb-3" type="submit" sx={{ background: orange[500] }} id="submit">Edit</Button>
                            </Form>
                        )}
                    </Formik>
                </div>) : (<div></div>)}

                {/* Add score */}
                <div>
                    <Dialog
                        open={openAddScore}
                        onClose={handleCloseAddScore}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries((formData as any).entries());
                                let ex: Exam = {} as Exam
                                exams.forEach((item) => {
                                    if (item.id === exam) { ex = item }
                                })
                                const addProgres: UserProgres = {
                                    userId: user.id,
                                    examId: exam,
                                    exam: formJson.examName,
                                    score: Number(formJson.score),
                                    data: ex.dataCreated,
                                    teacher: formJson.teacher
                                }
                                eddFechScoreStudent(addProgres).then((response) => setUser(response))
                                handleCloseAddScore();
                            },
                        }}
                    >
                        <DialogTitle>Add score</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="examName"
                                name="examName"
                                label="Exam name"
                                type="examName"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="score"
                                name="score"
                                label="Score"
                                type="score"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="teacher"
                                name="teacher"
                                label="Teacher"
                                type="teacher"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleAddScore}>Cancel</Button>
                            <Button type="submit">Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                {/* Add score */}
                <div>
                    <Dialog
                        open={openEditScore}
                        onClose={handleCloseEditScore}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries((formData as any).entries());
                                let ex: Exam = {} as Exam
                                exams.forEach((item) => {
                                    if (item.id === exam) { ex = item }
                                })
                                const addProgres: EditExamScore = {
                                    userId: user.id,
                                    examId: exam,
                                    exam: formJson.examName,
                                    score: Number(formJson.score),
                                    data: ex.dataCreated,
                                    teacher: formJson.teacher
                                }
                                fechEditExamUser(addProgres).then((response) => setUser(response))
                                handleCloseEditScore();
                            },
                        }}
                    >
                        <DialogTitle>Edit score</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="examName"
                                name="examName"
                                label="Exam name"
                                type="examName"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="score"
                                name="score"
                                label="Score"
                                type="score"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="teacher"
                                name="teacher"
                                label="Teacher"
                                type="teacher"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEditScore}>Cancel</Button>
                            <Button type="submit">Subscribe</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </UserContext.Provider >
    )
}

export default EditUserPrifileAdmin