import axios, { AxiosError } from "axios"
import { Image, ImgDto } from "./type"


export const fechChangeFoto = async (imgDto: ImgDto): Promise<Image> => {
    try {
        const res = await axios.post(`/api/v1/users/${imgDto.userId}/img`, imgDto.event)
        return res.data
    } catch (error) {
        throw new Error("Error!!!")
    }
}

export const fechGetFoto = async (imgId: string): Promise<Image> => {
    try {
        const res = await axios.get(`/api/v1/users/img/${imgId}`)
        return res.data
    } catch (error) {
        throw new Error("Error!!!")
    }
}