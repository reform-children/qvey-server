import { getAllBook } from '../repository/bookRepository'
import { Book, BookListSearchOption } from '../types/book'

export const getBookList = async ({ title, description }: BookListSearchOption): Promise<Book[]> => {
    const bookList = await getAllBook({ description, title })
    return bookList
}
