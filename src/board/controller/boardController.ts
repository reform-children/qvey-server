import { Request, Response } from 'express'
import {
    BoardListRequestDTO,
    BoardListResponseDTO,
    CreateBoardReponseDTO,
    CreateBoardRequestDTO,
} from '../dto/boardDTO'
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

const DEV_USER = 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2'
/**
 * 자유게시판 등록
 */
export const createBoard = async (req: Request, res: Response) => {
    const { content, subject }: CreateBoardRequestDTO = req.body
    if (!subject) throw new Error('Subject Empty')
    if (!content) throw new Error('Content Empty')

    const { boardId } = await boardService.createBoard({ content, subject, userId: DEV_USER })
    const _res: CreateBoardReponseDTO = { boardId }
    res.send(_res)
}
