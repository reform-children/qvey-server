export interface Question {
  question_id: number;
  book_id: number;
  question_title: string;
  question_content: string;
  question_type: string;
  question_answer: string;
  generate_id: string;
  generate_time: Date;
  modified_id?: string;
  modified_time?: Date;
}
