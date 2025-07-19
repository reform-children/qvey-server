import { Request, Response } from 'express'
import { BookListRequestDTO } from '../dto/bookDTO'
import { getBookList } from '../service/bookService'

export const getBooks = async (req: Request, res: Response) => {
    const dto: BookListRequestDTO = req.body
    try {
        const books = await getBookList({})
        res.json({ data: books, message: 'success' })
    } catch (err) {}
}
