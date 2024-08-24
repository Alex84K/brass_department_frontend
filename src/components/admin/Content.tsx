import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser, selectUsersList } from '../../features/users/userSlice';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { createExam, deleteExam, selectExamsList, updateExam } from '../../features/exams/examsSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { orange, red } from '@mui/material/colors';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { EditExam, NewExam } from '../../features/exams/type';
import styles from "./Admin.module.css"
import { Typography } from '@mui/material';
import { createMaterial, deleteMaterial, selectMaterialsList } from '../../features/materials/materialSlice';
import { allFechMaterials } from '../../features/materials/materialApi';
import Link from '@mui/material/Link';
import { NewMaterial } from '../../features/materials/type';
import { AdminContext } from './utils/context';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Content() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsersList)
  const user = useAppSelector(selectUser)
  const exams = useAppSelector(selectExamsList)
  const materials = useAppSelector(selectMaterialsList)
  const { usersTable, examsTable, materialsTable } = useContext(AdminContext);

  const [openNewExam, setOpenNewExam] = useState(false);
  const handleOpenNewExam = () => { setOpenNewExam(true) };
  const handleCloseNewExam = () => { setOpenNewExam(false) };

  const [openExamEdit, setOpenExamEdit] = useState(false);
  const [currentExamId, setCurrentExamId] = useState('')
  const [currentExamName, setCurrentExamName] = useState('')
  const [currentExamGroup, setCurrentExamGroup] = useState('')
  const [currentExamTeacher, setCurrentExamTeacher] = useState('')
  const handleOpenExamEdit = (curId: string, curExName: string, curExGroup: string, curTeacher: string) => {
    setOpenExamEdit(true)
    setCurrentExamId(curId)
    setCurrentExamName(curExName)
    setCurrentExamGroup(curExGroup)
    setCurrentExamTeacher(curTeacher)
  };
  const handleCloseExamEdit = () => { setOpenExamEdit(false) };

  const [openNewMaterial, setOpenNewMaterial] = useState(false);
  const handleOpenNewMaterial = () => { setOpenNewMaterial(true) };
  const handleCloseNewMaterial = () => { setOpenNewMaterial(false) };

  useEffect(() => {
  }, [users])


  return (
    <>
      {!usersTable ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First & last name</StyledTableCell>
                <StyledTableCell align="right">Username</StyledTableCell>
                <StyledTableCell align="right">Num Book</StyledTableCell>
                <StyledTableCell align="right">City</StyledTableCell>
                <StyledTableCell align="right">Group</StyledTableCell>
                <StyledTableCell align="right">Speciality</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((u, i) => (
                <StyledTableRow key={u.id} onClick={() => navigate(`/admin-user/${u.id}`)}>
                  <StyledTableCell component="th" scope="row">
                    {u.firstName} {u.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="right">{u.username}</StyledTableCell>
                  <StyledTableCell align="right">{u.numberBook}</StyledTableCell>
                  <StyledTableCell align="right">{u.city}</StyledTableCell>
                  <StyledTableCell align="right">{u.group}</StyledTableCell>
                  <StyledTableCell align="right">{u.speciality}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (<p></p>)}
      {!examsTable ? (<>
        <Button onClick={handleOpenNewExam} variant='contained'>Create exam</Button>
      <TableContainer component={Paper} className='mt-4'>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Exam</StyledTableCell>
              <StyledTableCell align="right">Data</StyledTableCell>
              <StyledTableCell align="right">Group</StyledTableCell>
              <StyledTableCell align="right">Teacher</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
              <StyledTableCell align="right">ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams?.map((e, i) => (
              <StyledTableRow key={e.id}>
                <StyledTableCell component="th" scope="row">
                  {e.examName}
                </StyledTableCell>
                <StyledTableCell align="right">{e.dataCreated}</StyledTableCell>
                <StyledTableCell align="right">{e.group}</StyledTableCell>
                <StyledTableCell align="right">{e.teacher}</StyledTableCell>
                <StyledTableCell align="right"><ModeEditIcon sx={{ color: orange[500] }} className={`${styles.cursor_p}`} onClick={
                  () => handleOpenExamEdit(e.id, e.examName, e.group, e.teacher)} /></StyledTableCell>
                <StyledTableCell align="right"><DeleteIcon sx={{ color: red[500] }} className={`${styles.cursor_p}`} onClick={() => dispatch(deleteExam(String(e.id)))} /></StyledTableCell>
                <StyledTableCell align="right">{e.id}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>) : (<p></p>)}

      {!materialsTable ? (<>
        <Button onClick={handleOpenNewMaterial} variant='contained'>Create material</Button>
      <TableContainer component={Paper} className='mt-4'>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Material</StyledTableCell>
              <StyledTableCell align="right">Link</StyledTableCell>
              <StyledTableCell align="right">Tags</StyledTableCell>
              <StyledTableCell align="right">Publisher</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials !== undefined ? (
              materials.map((m) => (
                <StyledTableRow key={m.id}>
                  <StyledTableCell component="th" scope="row">
                    {m.title}
                  </StyledTableCell>
                  <StyledTableCell align="right"><Link href={m.link} variant="body2">
                    {`${m.link.slice(0, 20)}`}
                  </Link></StyledTableCell>
                  <StyledTableCell align="right">{m.tags}</StyledTableCell>
                  <StyledTableCell align="right">{m.publisherId}</StyledTableCell>
                  <StyledTableCell align="right"><DeleteIcon sx={{ color: red[500] }} className={`${styles.cursor_p}`} onClick={() => dispatch(deleteMaterial(String(m.id)))} /></StyledTableCell>
                </StyledTableRow>
              ))
            ) : (<p></p>)}
          </TableBody>
        </Table>
      </TableContainer></>) : (<p></p>)}

      {/*Exams-*/}
      <div>
        <Dialog
          open={openNewExam}
          onClose={handleCloseNewExam}
          PaperProps={{
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const newEx: NewExam = {
                examName: formJson.examName,
                group: formJson.group,
                teacher: formJson.teacher
              }
              dispatch(createExam(newEx))
              handleCloseNewExam();
            },
          }}
        >
          <DialogTitle>Create exam</DialogTitle>
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
              id="group"
              name="group"
              label="Group"
              type="group"
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
            <Button onClick={handleCloseNewExam}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={openExamEdit}
          onClose={handleCloseExamEdit}
          PaperProps={{
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.group;
              const examDto: EditExam = {
                id: currentExamId,
                examName: formJson.examName,
                group: formJson.group,
                teacher: formJson.teacher
              }
              dispatch(updateExam(examDto))
              handleCloseExamEdit();
            },
          }}
        >
          <DialogTitle>Edit exam</DialogTitle>
          <DialogContent>
            <Typography id="modal-modal-description">
              Exam: {currentExamName} | {currentExamGroup} | {currentExamTeacher}
            </Typography>
            <TextField
              autoFocus
              required
              margin="dense"
              id="examName1"
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
              id="group1"
              name="group"
              label="Group"
              type="group"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="teacher1"
              name="teacher"
              label="Teacher"
              type="teacher"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseExamEdit}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>

      {/*Materials */}
      <div>
        <Dialog
          open={openNewMaterial}
          onClose={handleCloseNewMaterial}
          PaperProps={{
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const arrTags = formJson.tags.split('#' || ' ' || ',');
              const newMaterial: NewMaterial = {
                title: formJson.title,
                tags: arrTags,
                publisherId: user?.id,
                link: formJson.link
              }
              dispatch(createMaterial(newMaterial))
              handleCloseNewExam();
            },
          }}
        >
          <DialogTitle>Create material</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="title"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="tags"
              name="tags"
              label="Tags"
              type="tags"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="link"
              name="link"
              label="Link"
              type="link"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewMaterial}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>

  );
}