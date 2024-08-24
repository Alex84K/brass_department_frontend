import React, { useCallback, useRef, useState } from 'react'
import style from "./../Foo.module.css"
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectUser } from '../../../features/users/userSlice'
import { changeAvatar, getAvatar, selectImage } from '../../../features/images/imageSlice'
import { ImgDto } from '../../../features/images/type'

const ImageTr = () => {
    let [img, setImg] = useState<string>('')
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const avatar = useAppSelector(selectImage)

    /*const handleCheang = async (event: any) => {
        console.log(event.target.files);
        setFile(event.target.files[0])

        let formData = new FormData();
        formData.append("file", event.target.files[0]);

        let res = await fetch(`http://localhost:8080/api/v1/users/${user?.id}/img`, {
            method: "POST",
            body: formData,
        })

        const data = await res.json()
        console.log(data);
    }*/

    const get = async () => {
        dispatch(getAvatar(String(user?.image)))
        const dataURI = `data:image/jpeg;base64,${avatar?.bytes}`;
        setImg(dataURI)
        console.log(dataURI);
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


    return (
        <div>
            <form encType="multipart/form-data" method="post" action="/uploadFile">
                <input type='file' onChange={handleCheang} />
            </form>
            <button onClick={get}>AVATAR</button>
            <img src={img} className={style.imgTest} />
            
        </div>
    )
}

export default ImageTr