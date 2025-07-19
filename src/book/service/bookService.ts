import { getAllBook } from '../repository/bookRepository'
import { Book, BookListSearchOption } from '../types/book'

export const getBookList = async ({ title, content }: BookListSearchOption): Promise<Book[]> => {
    const bookList = await getAllBook()
    return bookList
}
