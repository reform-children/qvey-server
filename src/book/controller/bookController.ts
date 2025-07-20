import { Request, Response } from 'express'
import { BookListRequestDTO, BookListResponseDTO } from '../dto/bookDTO'
import { getBookList } from '../service/bookService'

export const getBooks = async (req: Request, res: Response) => {
    const { title = '', description = '' } = req.query
    const books = await getBookList({ title: title.toString(), description: description.toString() })
    const response: BookListResponseDTO = { data: books, count: books.length }
    res.json(response)
}
