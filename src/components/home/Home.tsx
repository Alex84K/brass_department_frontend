import Button from '@mui/material/Button';
import iconBig from "/assets/icon_banner.svg"
import style from "./Home.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { selectUser } from '../../features/users/userSlice';
import { User, UserState } from '../../features/users/type';


const Home = () => {
    const navigate = useNavigate()
    const user: UserState = useAppSelector(state => state.user)

    const goTo = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer'); 
    }

    return (
        <>
            <div className={`${style.bg_whitebl} container-fluid pt-5 pb-5`}>
                <div className='container pt-5 pb-5'>
                    <div className='row'>
                        <div className={`${style.bg_whitebl} col-lg-8 col-sm-12`}>
                            <h1 className='txt_white mt-2'>Platform for training brass band leaders and teachers</h1>
                            <p className='txt_white'>This platform was created for training brass band musicians, directors, conductors and teachers.</p>
                            <div className='d-flex flex-row'>
                                {user.status !== "success" ? (<p className={`${style.btn_orange} mt-5`} onClick={() => navigate('register')}>REGISTER</p>) : (<p></p>)}
                            </div>
                        </div>
                        <img src={iconBig} className='col-lg-4 col-sm-12' />
                    </div>
                </div>
            </div>
            <div className={`container`}>
                <div className={`row  col-sm-12 mx-auto d-flex justify-content-around`}>
                    <div className={`${style.info_box} col-lg-2 mt-5 mb-5`} onClick={() => goTo('http://ifob.su/materials/')}><h3>Materials</h3></div>
                    <div className={`${style.info_box} col-lg-2 mt-5 mb-5`} onClick={() => goTo('http://ifob.su/photo/')}><h3>Fotos</h3></div>
                    <div className={`${style.info_box} col-lg-2 mt-5 mb-5`} onClick={() => goTo('http://ifob.su/materials/')}><h3>Videos</h3></div>
                    <div className={`${style.info_box} col-lg-2 mt-5 mb-5`} onClick={() => goTo('http://ifob.su/audio/')}><h3>Audio</h3></div>
                </div>
            </div>
        </>

    )
}

export default Home