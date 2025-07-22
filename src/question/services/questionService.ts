// 문제 기능 서비스

import * as questionRepo from "../repositories/questionRepository";
import { CreateQuestionRequestDTO, UpdateQuestionRequestDTO, QuestionResponseDTO } from "../dto/questionDTO";

// 모든 문제를 조회한다 
export const getAllQuestions = async (): Promise<QuestionResponseDTO[]> => {
    return await questionRepo.findAll();
};

// 문제 ID로 문제를 조회한다 
export const getQuestionById = async (id: number): Promise<QuestionResponseDTO | null> => {
    return await questionRepo.findById(id);
};

// 도서 ID로 문제 목록을 조회한다 
export const getQuestionsByBookId = async (bookId: number): Promise<QuestionResponseDTO[]> => {
    return await questionRepo.findByBookId(bookId);
};

// 문제를 생성한다 
export const createQuestion = async (reqData: CreateQuestionRequestDTO): Promise<QuestionResponseDTO> => {
  const { question_type, question_answer } = reqData;

  if (question_type === "O") {
    // 객관식: A-D 중 하나만 허용
    const validChoices = ["A", "B", "C", "D"];
    if (!validChoices.includes(question_answer)) {
      throw new Error(`객관식(O)은 ${validChoices.join(", ")} 중 하나여야 합니다.`);
    }
  } else if (question_type === "S") {
    // 주관식: 최소 한 글자
    if (question_answer.trim().length === 0) {
      throw new Error("주관식(S) 정답은 비어 있을 수 없습니다.");
    }
  } else {
    throw new Error("question_type은 O(객관식) 또는 S(주관식)만 허용됩니다.");
  }

  return await questionRepo.create(reqData);
};

// 문제를 수정한다 
export const updateQuestion = async (
    id: number, 
    reqData: UpdateQuestionRequestDTO
): Promise<QuestionResponseDTO | null> => {
    return await questionRepo.update(id, reqData);
};

// 문제를 삭제한다 
export const deleteQuestion = async (id: number): Promise<void> => {
    await questionRepo.remove(id);
};
