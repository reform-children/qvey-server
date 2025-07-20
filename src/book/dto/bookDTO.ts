import { Book } from '../types/book'

export interface BookListRequestDTO {
    title?: string
    content?: string
}
export interface BookListResponseDTO {
    data: Book[]
    count: number
}
