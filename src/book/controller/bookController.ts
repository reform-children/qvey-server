import { Request, Response } from 'express'
import {
    BookListRequestDTO,
    BookListResponseDTO,
    CreateBookRequestDTO,
    CreateBookResponseDTO,
    DeleteBookResponseDTO,
    UpdateBookRequestDTO,
    UpdateBookResponseDTO,
} from '../dto/bookDTO'
import bookService, { getBookList } from '../service/bookService'

export const getBooks = async (req: Request, res: Response) => {
    const { title = '', description = '' }: BookListRequestDTO = req.query
    const books = await getBookList({ title: title.toString(), description: description.toString() })
    const response: BookListResponseDTO = { data: books, count: books.length }
    res.json(response)
}

// User Id 하드코딩
const DEMO_USER_ID = 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2'

export const createBook = async (req: Request, res: Response) => {
    if (!req.body) {
        throw new Error('Body Null Error')
    }
    const { title, description }: CreateBookRequestDTO = req.body
    const resultId = await bookService.createBook({ title, description, userId: DEMO_USER_ID })
    const response: CreateBookResponseDTO = {
        bookId: resultId,
    }
    res.json(response)
}

export const deleteBook = async (req: Request, res: Response) => {
    const { bookId } = req.params
    await bookService.deleteBook({ bookId: +bookId })
    const response: DeleteBookResponseDTO = {
        bookId: +bookId,
    }
    res.json(response)
}

export const updateBook = async (req: Request, res: Response) => {
    const { bookId } = req.params
    const { title, description }: UpdateBookRequestDTO = req.body ?? {}

    await bookService.updateBook({
        bookId: +bookId,
        title,
        description,
    })

    const response: UpdateBookResponseDTO = { bookId: +bookId }
    res.json(response)
}