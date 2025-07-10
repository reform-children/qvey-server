import { Request, Response } from 'express';
import { pool } from '../db/index';
import { Book } from '../models/book.model';

export const getBooks = async (_: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM books');
  res.json(result.rows);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  res.json(result.rows[0]);
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author, published_date } = req.body as Book;
  const result = await pool.query(
    'INSERT INTO books (title, author, published_date) VALUES ($1, $2, $3) RETURNING *',
    [title, author, published_date]
  );
  res.status(201).json(result.rows[0]);
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, published_date } = req.body as Book;
  const result = await pool.query(
    'UPDATE books SET title = $1, author = $2, published_date = $3 WHERE id = $4 RETURNING *',
    [title, author, published_date, id]
  );
  res.json(result.rows[0]);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('DELETE FROM books WHERE id = $1', [id]);
  res.sendStatus(204);
};
