import { RequestHandler } from "express";
import * as service from "../services/questionService";

// 전체 문제 조회
export const getAllQuestions: RequestHandler = async (_req, res, next) => {
  try {
    const questions = await service.getAllQuestions();
    res.json({ data: questions });
  } catch (err) {
    next(err);
  }
};

// 특정 문제 조회
export const getQuestionById: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const question = await service.getQuestionById(id);
    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }
    res.json({ data: question });
  } catch (err) {
    next(err);
  }
};

// 특정 도서(book_id)의 문제 목록 조회
export const getQuestionsByBookId: RequestHandler = async (req, res, next) => {
  const bookId = Number(req.params.book_id);
  try {
    const questions = await service.getQuestionsByBookId(bookId);
    res.json({ data: questions });
  } catch (err) {
    next(err);
  }
};

// 문제 생성
export const createQuestion: RequestHandler = async (req, res, next) => {
  const { book_id, question_title, question_content, question_type, question_answer, generate_id } = req.body;

  if (!book_id || !question_title || !question_content || !question_type || !question_answer || !generate_id) {
    res.status(400).json({ error: "All required fields must be provided" });
    return;
  }

  try {
    const newQuestion = await service.createQuestion({
      book_id,
      question_title,
      question_content,
      question_type,
      question_answer,
      generate_id,
    });
    res.status(201).json({ data: newQuestion });
  } catch (err: any) {
    // 검증 오류는 400으로 반환
    res.status(400).json({ error: err.message });
  }
};

// 문제 수정
export const updateQuestion: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  const { question_title, question_content, question_type, question_answer, modified_id } = req.body;

  if (!question_title && !question_content && !question_type && !question_answer) {
    res.status(400).json({ error: "At least one field must be provided for update" });
    return;
  }

  try {
    const updatedQuestion = await service.updateQuestion(id, {
      question_title,
      question_content,
      question_type,
      question_answer,
      modified_id,
    });

    if (!updatedQuestion) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    res.json({ data: updatedQuestion });
  } catch (err) {
    next(err);
  }
};

// 문제 삭제
export const deleteQuestion: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await service.deleteQuestion(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
