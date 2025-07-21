import { BookEntity } from '../entity/bookEntity'
import { Book, BookListSearchOption, CreateBook, DeleteBook } from '../types/book'
import { getPool } from '../../db'

function toBook({ book_description, book_id, book_title, generate_time, modified_time, user_id }: BookEntity): Book {
    return {
        id: book_id,
        title: book_title,
        userId: user_id,
        description: book_description,
        generateTime: generate_time,
        modifiedTime: modified_time,
    }
}
export const getAllBook = async (option: BookListSearchOption): Promise<Book[]> => {
    const { title, description } = option

    let sql = `SELECT * FROM books WHERE 1 = 1`
    const params: any[] = []
    let index = 1

    if (title) {
        sql += ` AND book_title ILIKE $${index}` // ILIKE는 대소문자 무시
        params.push(`%${title}%`) // %text% 이렇게 들어감
        index++
    }
    if (description) {
        sql += ` AND book_description ILIKE $${index}`
        params.push(`%${description}%`)
        index++
    }

    const result = await getPool().query<BookEntity>(sql, params)
    return result.rows.map(toBook)
}

export const save = async ({ description, title, userId }: CreateBook): Promise<number> => {
    const sql = `
        INSERT INTO books (
            user_id, book_title, book_description
        )
        VALUES ($1, $2, $3)
        RETURNING book_id
    `
    try {
        const result = await getPool().query<{ book_id: number }>(sql, [userId, title, description])
        return result.rows[0].book_id
    } catch (err) {
        console.error(err)
        throw new Error('DB Internal Error')
    }
}

export const deleteById = async ({ bookId }: DeleteBook): Promise<void> => {
    try {
        await getPool().query(`DELETE FROM books WHERE book_id = $1`, [bookId])
    } catch (err) {
        console.error(err)
        throw new Error('DB Internal Error')
    }
}

export default {
    getAllBook,
    save,
    deleteById,
}
