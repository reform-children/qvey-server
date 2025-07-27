import { pool } from "../../db";
import { CreateQuestionRequestDTO,UpdateQuestionRequestDTO,QuestionResponseDTO} from "../dto/questionDTO";

// 모든 문제를 조회한다
export const findAll = async (): Promise<QuestionResponseDTO[]> => {
    const query = `SELECT * FROM question ORDER BY generate_time DESC`;
    const result = await pool.query(query);
    return result.rows;
};

// 문제 ID로 문제를 조회한다 
export const findById = async (id: number): Promise<QuestionResponseDTO | null> => {
    const query = `SELECT * FROM question WHERE question_id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
};

// 도서 ID로 문제 목록을 조회한다 
export const findByBookId = async (bookId: number): Promise<QuestionResponseDTO[]> => {
    const query = `SELECT * FROM question WHERE book_id = $1`;
    const result = await pool.query(query, [bookId]);
    return result.rows;
};

// 문제를 생성한다 
export const create = async (reqData: CreateQuestionRequestDTO): Promise<QuestionResponseDTO> => {
    const { book_id, question_title, question_content, question_type, question_answer, generate_id } = reqData;
    const query = `
        INSERT INTO question 
        (book_id, question_title, question_content, question_type, question_answer, generate_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
    const result = await pool.query(query, [
        book_id, question_title, question_content, question_type, question_answer, generate_id
    ]);
    return result.rows[0];
};

// 문제를 수정한다 
export const update = async (id: number, reqData: UpdateQuestionRequestDTO): Promise<QuestionResponseDTO | null> => {
    const { question_title, question_content, question_type, question_answer, modified_id } = reqData;
    const query = `
        UPDATE question
        SET question_title = $1, 
            question_content = $2, 
            question_type = $3, 
            question_answer = $4, 
            modified_id = $5, 
            modified_time = NOW()
        WHERE question_id = $6
        RETURNING *`;
    const result = await pool.query(query, [
        question_title, question_content, question_type, question_answer, modified_id, id
    ]);
    return result.rows[0] || null;
};

// 문제를 삭제한다 
export const remove = async (id: number): Promise<void> => {
    const query = `DELETE FROM question WHERE question_id = $1`;
    await pool.query(query, [id]);
};
