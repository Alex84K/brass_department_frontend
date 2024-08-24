export interface Material {
    id: string,
    title: string,
    tags: string[],
    publisherId: string,
    link: string
}

export interface NewMaterial {
    title: string,
    tags: string[],
    publisherId?: string,
    link: string
}

export interface MaterialState {
    material?: Material,
    materialsList?: Material[],
    errorMessage?: string,
    status?: string,
}

export interface MaterialsData {
    data: Material[]
    current_page: number
    total_elements: number
    total_pages: number
  }

