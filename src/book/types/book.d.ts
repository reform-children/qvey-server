export interface Book {
    id: number
    title: string
    content: string
}

export type BookListSearchOption = {
    title?: string
    content?: string
}
