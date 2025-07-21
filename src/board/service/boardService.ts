import { Board, BoardSearchOption } from '../model/boardModel'
import boardRepository from '../repository/boardRepository'

export const getBoardList = async ({ subject, content }: BoardSearchOption): Promise<Board[]> => {
    const data = await boardRepository.search({ subject, content })
    return data
}

export default {
    getBoardList,
}
