export interface Image {
    id: string,
    name: string,
    fileName: string,
    size: number,
    contentType: string
    bytes: string
}

export interface ImgDto {
    userId?: string
    event?: any
}

export interface ImageState {
    image?: Image,
    errorMessage?: string,
    status?: string,
}