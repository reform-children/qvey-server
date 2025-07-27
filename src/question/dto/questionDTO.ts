// 문제 생성 요청 모델 
export interface CreateQuestionRequestDTO {
    // 도서 고유번호 (외래키) 
    book_id: number;
    // 문제 제목 
    question_title: string;
    // 문제 내용 
    question_content: string;
    // 문제 유형 (O: 객관식, S: 주관식) 
    question_type: string;
    // 정답
    question_answer: string;
    // 생성자 ID 
    generate_id: string;
}

// 문제 수정 요청 모델 
export interface UpdateQuestionRequestDTO {
    // 문제 제목 
    question_title?: string;
    // 문제 내용 
    question_content?: string;
    // 문제 유형 (O: 객관식, S: 주관식) 
    question_type?: string;
    // 정답 
    question_answer?: string;
    // 수정자 ID 
    modified_id?: string;
}

// 문제 응답 모델
export interface QuestionResponseDTO {
    // 문제 고유번호 
    question_id: number;
    // 도서 고유번호 
    book_id: number;
    // 문제 제목 
    question_title: string;
    // 문제 내용 
    question_content: string;
    // 문제 유형 (O: 객관식, S: 주관식) 
    question_type: string;
    // 정답 
    question_answer: string;
    // 생성자 ID 
    generate_id: string;
    // 생성 일시 
    generate_time: Date;
    // 수정자 ID (수정되지 않았다면 null) 
    modified_id?: string;
    // 수정 일시 (수정되지 않았다면 null) 
    modified_time?: Date;
}
