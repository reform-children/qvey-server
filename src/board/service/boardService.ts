import { Board, BoardSearchOption, CreateBoard } from '../model/boardModel'
import boardRepository from '../repository/boardRepository'

export const getBoardList = async ({ subject, content }: BoardSearchOption): Promise<Board[]> => {
    const data = await boardRepository.search({ subject, content })
    return data
}
export const createBoard = async ({ content, subject, userId }: CreateBoard): Promise<{ boardId: number }> => {
    const id = await boardRepository.save({ content, subject, userId })
    return id
}

export default {
    getBoardList,
    createBoard,
}
