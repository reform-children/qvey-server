export interface BoardEntity {
    board_id: number
    board_subject: string
    board_content: string
    user_id: string
    generated_time: Date
    modified_time: Date | null
}
