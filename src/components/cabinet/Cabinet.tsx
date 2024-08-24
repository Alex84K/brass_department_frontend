import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../features/users/userSlice'
import Button from '@mui/material/Button';
import { orange, red } from '@mui/material/colors';
import styles from "./Cabinet.module.css"
import { User } from '../../features/users/type'
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../admin/Content';
import { selectImage } from '../../features/images/imageSlice';

const Cabinet = () => {
  const navigate = useNavigate()
  const user: User | undefined = useAppSelector(selectUser)
  const avatar = useAppSelector(selectImage)
  return (
    <div >
      <div className={`bg_whitebl container-fluid pt-2 pb-2`}>
        <div className='container '>
          <div className='row pt-2  d-flex justify-content-between'>
            <img src={`data:image/jpeg;base64,${avatar?.bytes}`} className={`${styles.img} mt-1 col-lg-4 col-sm-12`} />
            <div className={`bg_whitebl col-lg-4 col-sm-12`}>
              <h3 className='txt_white '>{user?.firstName} {user?.lastName}</h3>
              <p className='txt_white mt-0'><b>Record book:</b> {user?.numberBook}</p>
              <p className='txt_white mt-0 p-0'><b>Group:</b> {user?.group}</p>
              <p className='txt_white mt-0'><b>Instrument:</b> {user?.speciality}</p>
              <p className='txt_white mt-0'><b>City:</b> {user?.city}</p>
              <div className='d-flex flex-row'>
              </div>
            </div>
            <div className='col-lg-6 col-sm-12 d-flex flex-column justify-content-between'>
              <Button onClick={() => navigate(`/edit-profile/${user?.id}`)} variant='contained' className={`bg_whitebl mb-1 mt-1 col-lg-4 col-sm-12`} sx={{ background: orange[500], height: 40 }}>Edit profile</Button>
              <Button onClick={() => navigate(`/avatar`)} variant='contained' className={`bg_whitebl mb-1 mt-1 col-lg-4 col-sm-12`} sx={{ background: orange[500], height: 40 }}>Change avatar</Button>
              <Button onClick={() => navigate(`/edit-profile/${user?.id}`)} variant='contained' className={`bg_whitebl mb-3 mt-1 col-lg-4 col-sm-12`} sx={{ background: orange[500], height: 40 }}>Change password</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='p-5'>
        <h2>Scores</h2>
        {user?.progres ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Exam</StyledTableCell>
                  <StyledTableCell align="right">Score</StyledTableCell>
                  <StyledTableCell align="right">Data</StyledTableCell>
                  <StyledTableCell align="right">Teacher</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.progres.map((s, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {s.exam}
                    </StyledTableCell>
                    <StyledTableCell align="right">{s.score}</StyledTableCell>
                    <StyledTableCell align="right">{s.data}</StyledTableCell>
                    <StyledTableCell align="right">{s.teacher}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (<p></p>)}
      </div>

      <div className='p-5'>
        <h2>Failed exams</h2>
        {user?.examsFlags ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Exam</StyledTableCell>
                  <StyledTableCell align="right">Data</StyledTableCell>
                  <StyledTableCell align="right">Teacher</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.examsFlags.map((s, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {s.exam}
                    </StyledTableCell>
                    <StyledTableCell align="right">{s.data}</StyledTableCell>
                    <StyledTableCell align="right">{s.teacher}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (<p></p>)}
      </div>

    </div>
  )
}

export default Cabinet