export interface Board {
    id: number
    subject: string
    content: string
    userId: string
    generatedTime: Date
    modifiedTime: Date | null
}

export type BoardSearchOption = Partial<Pick<Board, 'subject' | 'content'>>
export type CreateBoard = Pick<Board, 'subject' | 'content' | 'userId'>
export type DeleteBoard = Pick<Board, 'id'>
