import { Book } from '../types/book'

export interface BookListRequestDTO {
    title?: string
    description?: string
}
export interface BookListResponseDTO {
    data: Book[]
    count: number
}

export interface CreateBookRequestDTO {
    title: string
    description: string
}

export interface CreateBookResponseDTO {
    id: number
}
