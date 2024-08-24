import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser } from '../../features/users/userSlice'
import { changeAvatar, getAvatar, selectImage } from '../../features/images/imageSlice'
import { ImgDto } from '../../features/images/type'
import { orange, red } from '@mui/material/colors';
import styles from "./Cabinet.module.css"
import { Button } from '@mui/material'

const Avatar = () => {
    let [img, setImg] = useState<string>('')
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const avatar = useAppSelector(selectImage)
    const filePiker = useRef<any>(null)

    const newAvatar = () => {
        filePiker.current.click();
    }

    const getByUser = () => {
        //console.log(data.bytes);
        const dataURI = `data:image/jpeg;base64,${user?.image}`;
        setImg(dataURI)
        console.log(dataURI);
    }

    const handleCheang = async (event: any) => {
        console.log(888);

        let formData = new FormData();
        formData.append("file", event.target.files[0]);
        console.log(event.target.files[0]);
        let imgDTO: ImgDto = {
            userId: user?.id,
            event: formData
        }
        dispatch(changeAvatar(imgDTO))
    }

    useEffect(() => {
        console.log(avatar);

    }, [])
    return (
        <div>
            <form encType="multipart/form-data" method="post" action="/uploadFile"  className={styles.displHendleNone}>
                <input type='file' onChange={handleCheang} ref={filePiker} />
            </form>
            <Button variant='contained' sx={{ background: orange[500], height: 40 }} onClick={newAvatar}>AVATAR</Button>
            <img src={`data:image/jpeg;base64,${avatar?.bytes}`} className={`${styles.img} mt-1 col-lg-4 col-sm-12`} />
        </div>
    )
}

export default Avatar