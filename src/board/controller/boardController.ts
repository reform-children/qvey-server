import { Request, Response } from 'express'
import { BoardListRequestDTO, BoardListResponseDTO } from '../dto/boardDTO'
import boardService from '../service/boardService'

/**
 * 자유게시판 리스트 조회
 */
export const getBoardList = async (req: Request, res: Response) => {
    const { content, subject }: BoardListRequestDTO = req.query
    const data = await boardService.getBoardList({ content, subject })
    const _res: BoardListResponseDTO = { data, count: data.length }
    res.send(_res)
}
