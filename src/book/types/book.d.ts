export interface Book {
    id: number
    title: string
    description: string
    userId: string
    generateTime: Date
    modifiedTime: Date
}

export type BookListSearchOption = {
    title?: string
    description?: string
}
