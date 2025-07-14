import { pool } from '../db';

export interface Book {
  id?: number;
  title: string;
  author: string;
  published_date?: string; // KST 기준 포맷된 문자열
}

// 전체 조회
export const getAllBooks = async (): Promise<Book[]> => {
  const result = await pool.query(`
    SELECT id, title, author,
    TO_CHAR(published_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') AS published_date
    FROM books
    ORDER BY published_date DESC
  `);
  return result.rows;
};

// 단일 조회
export const getBookById = async (id: number): Promise<Book | undefined> => {
  const result = await pool.query(`
    SELECT id, title, author,
    TO_CHAR(published_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') AS published_date
    FROM books
    WHERE id = $1
  `, [id]);
  return result.rows[0];
};

// 생성
export const createBook = async (book: Book): Promise<Book> => {
  const { title, author } = book;
  const result = await pool.query(`
    INSERT INTO books (title, author, published_date)
    VALUES ($1, $2, NOW())
    RETURNING id, title, author,
    TO_CHAR(published_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') AS published_date
  `, [title, author]);
  return result.rows[0];
};

// 수정
export const updateBook = async (id: number, book: Book): Promise<Book> => {
  const { title, author } = book;
  const result = await pool.query(`
    UPDATE books
    SET title = $1, author = $2, published_date = NOW()
    WHERE id = $3
    RETURNING id, title, author,
    TO_CHAR(published_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM-DD') AS published_date
  `, [title, author, id]);
  return result.rows[0];
};

// 삭제
export const deleteBook = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM books WHERE id = $1', [id]);
};
