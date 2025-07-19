import { BookEntity } from '../entity/bookEntity'
import { Book } from '../types/book'

function toBook({ book_content, book_id, book_title }: BookEntity): Book {
    return { id: book_id, content: book_content, title: book_title }
}
export const getAllBook = async (): Promise<Book[]> => {
    // 대충 DB Excute 가정
    const DATA: BookEntity[] = [
        { book_content: 'asd', book_id: 1, book_title: '123' },
        { book_content: 'asd', book_id: 2, book_title: '123' },
        { book_content: 'asd', book_id: 3, book_title: '123' },
        { book_content: 'asd', book_id: 4, book_title: '123' },
    ]
    return Promise.resolve(DATA.map(toBook))
}
