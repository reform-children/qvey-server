import { Board } from '../model/boardModel'

/**
 * 자유게시판 조회시 DTO
 */
export interface BoardListRequestDTO {
    /**
     * 제목 검색 조건
     */
    subject?: string
    /**
     * 내용 검색 조건
     */
    content?: string
}

export interface BoardListResponseDTO {
    /**
     * 조회된 게시글
     */
    data: Board[]
    /**
     * 조회된 게시글 수
     */
    count: number
}

export interface CreateBoardRequestDTO extends Partial<Pick<Board, 'subject' | 'content'>> {}
export interface CreateBoardReponseDTO {
    /**
     * 생성된 게시글 ID
     */
    boardId: number
}

export interface DeleteBoardResponseDTO {
    boardId: number
}