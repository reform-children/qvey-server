import { getPool } from '../../db'
import { BoardEntity } from '../entity/boardEntity'
import { Board, BoardSearchOption } from '../model/boardModel'

/**
 *
 * BoardEntity 를 Board 로 변환
 * @param entity
 */
function toBoard(entity: BoardEntity): Board {
    return {
        id: entity.board_id,
        subject: entity.board_subject,
        content: entity.board_content,
        userId: entity.user_id,
        generatedTime: entity.generated_time,
        modifiedTime: entity.modified_time,
    }
}

export const search = async ({ subject, content }: BoardSearchOption): Promise<Board[]> => {
    const pool = getPool()
    let sql = `
    SELECT
        board_id,
        board_subject,
        board_content,
        user_id,
        generated_time,
        modified_time
    FROM board
    WHERE
        1 = 1
    `
    const params: any[] = []
    let index = 1

    if (subject) {
        sql += ` AND board_subject ILIKE $${index}` // ILIKE는 대소문자 무시
        params.push(`%${subject}%`) // %text% 이렇게 들어감
        index++
    }

    if (content) {
        sql += ` AND board_content ILIKE $${index}`
        params.push(`%${content}%`)
        index++
    }

    const result = await pool.query<BoardEntity>(sql, params)
    return result.rows.map(toBoard)
}

export default {
    search,
}
