import { createAppSlice } from "../../app/createAppSlice";
import { fechChangeFoto, fechGetFoto } from "./imageApi";
import { Image, ImageState, ImgDto } from "./type";


const initialState: ImageState = {
    image: {} as Image,
    errorMessage: '',
    status: "idle",
}

export const imageSlice = createAppSlice({
    name: "image",
    initialState,
    reducers: create => ({
        getAvatar: create.asyncThunk(
            async (img: string) => {
                const response = await fechGetFoto(img)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.image = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        changeAvatar: create.asyncThunk(
            async (imgDto: ImgDto) => {
                const response = await fechChangeFoto(imgDto)
                console.log(imgDto);

                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.image = action.payload
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
    }),
    selectors: {
        selectImage: state => state.image,
        selectError: state => state.errorMessage,
        selectMaterialStatus: state => state.status,
    },
})
export const { changeAvatar, getAvatar } = imageSlice.actions
export const { selectImage, selectError, selectMaterialStatus } = imageSlice.selectors