export interface Board {
    id: number
    subject: string
    content: string
    userId: string
    generatedTime: Date
    modifiedTime: Date | null
}

export type BoardSearchOption = { subject?: string; content?: string }
