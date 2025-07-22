import bookRepository, { getAllBook, updateById } from '../repository/bookRepository'
import { Book, BookListSearchOption, CreateBook, DeleteBook, UpdateBook } from '../types/book'

export const getBookList = async ({ title, description }: BookListSearchOption): Promise<Book[]> => {
    const bookList = await getAllBook({ description, title })
    return bookList
}

export const createBook = async ({ title, description, userId }: CreateBook): Promise<number> => {
    const id = await bookRepository.save({ title, description, userId })
    return id
}

export const deleteBook = async ({ bookId }: DeleteBook) => {
    bookRepository.deleteById({ bookId })
}

export const updateBook = async ({ bookId, title, description }: UpdateBook): Promise<void> => {
    await updateById({ bookId, title, description })
}

export default {
    getBookList,
    createBook,
    deleteBook,
    updateBook
}
