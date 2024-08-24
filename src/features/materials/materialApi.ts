import axios, { AxiosError } from "axios"
import { Material, MaterialsData, NewMaterial } from "./type"

export const addMaterialGlobal = async (material: NewMaterial): Promise<Material> => {
    try {
        const res = await axios.post(
            `/api/v1/materials/${material.publisherId}`,
            {
                title: material.title,
                tags: material.tags,
                link: material.link
            },
            { headers: { "Content-Type": "application/json" } },
        )
        return res.data
    } catch (error) {
        throw new Error("Error!!!")
    }
}

export const removeMaterial = async (id:string): Promise<Material> => {
    try {
        const res = await axios.delete(
            `/api/v1/materials/${id}`
        )
        return res.data
    } catch (error) {
        throw new Error("Error!!!")
    }
}

export const allFechMaterials = async (size: number): Promise<MaterialsData> => {
    try {
        const res = await axios.get(
            `/api/v1/materials`
        )
        return res.data
    } catch (error) {
        throw new Error("Error!!!")
    }
}