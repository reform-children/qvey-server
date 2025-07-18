import { RequestHandler } from 'express';
import * as model from '../../book/models/bookModel';

// 전체 도서 조회
export const listBooks: RequestHandler = async (_req, res, next) => {
  try {
    const books = await model.getAllBooks();
    res.json({ data: books });
  } catch (err) {
    next(err);
  }
};

// 특정 도서 조회 
export const getBook: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const book = await model.getBookById(id);
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json({ data: book });
  } catch (err) {
    next(err);
  }
};

// 도서 생성 
export const createBook: RequestHandler = async (req, res, next) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).json({ error: 'Title and author required' });
    return;
  }
  try {
    const newBook = await model.createBook({ title, author });
    res.status(201).json({ data: newBook });
  } catch (err) {
    next(err);
  }
};

// 도서 수정
export const updateBook: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).json({ error: 'Title and author required' });
    return;
  }
  try {
    const updatedBook = await model.updateBook(id, { title, author });
    if (!updatedBook) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json({ data: updatedBook });
  } catch (err) {
    next(err);
  }
};

// 도서 삭제 
export const deleteBook: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await model.deleteBook(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
