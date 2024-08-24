import { createAppSlice } from "../../app/createAppSlice";
import { addMaterialGlobal, allFechMaterials, removeMaterial } from "./materialApi";
import { Material, MaterialState, NewMaterial } from "./type";


const initialState: MaterialState = {
    material: {} as Material,
    materialsList: [] as Material[],
    errorMessage: '',
    status: "idle",
}

export const materialSlice = createAppSlice({
    name: "material",
    initialState,
    reducers: create => ({
        createMaterial: create.asyncThunk(
            async (newMaterial: NewMaterial) => {
                const response = await addMaterialGlobal(newMaterial)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.material = action.payload
                    state.materialsList?.push(action.payload)
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        deleteMaterial: create.asyncThunk(
            async (id: string) => {
                const response = await removeMaterial(id)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.material = {} as Material
                    state.materialsList?.splice(0, state.materialsList?.length, ...state.materialsList?.filter(m => m.id !== action.payload.id))
                    state.status = "success"
                },
                rejected: (state, action) => {
                    state.errorMessage = action.error.message
                    state.status = "error"
                },
            },
        ),
        allMaterials: create.asyncThunk(
            async (size: number) => {
                const response = await allFechMaterials(size)
                return response
            },
            {
                pending: state => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.materialsList = action.payload.data
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
        selectMaterial: state => state.material,
        selectMaterialsList: state => state.materialsList,
        selectError: state => state.errorMessage,
        selectMaterialStatus: state => state.status,
    },
})
export const { allMaterials, createMaterial, deleteMaterial } = materialSlice.actions
export const { selectMaterial, selectMaterialsList, selectError, selectMaterialStatus } = materialSlice.selectors