CREATE TABLE board (
    board_id        SERIAL PRIMARY KEY,
    board_subject   VARCHAR(200) NOT NULL,
    board_content   TEXT NOT NULL,
    user_id         UUID NOT NULL,
    generated_time  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_time   TIMESTAMP
);

COMMENT ON COLUMN "board"."board_id" IS '게시글 고유 ID';
COMMENT ON COLUMN "board"."board_subject" IS '게시글 제목';
COMMENT ON COLUMN "board"."board_content" IS '게시글 본문 내용';
COMMENT ON COLUMN "board"."user_id" IS '작성자 UUID';
COMMENT ON COLUMN "board"."generated_time" IS '글이 최초 작성된 시간';
COMMENT ON COLUMN "board"."modified_time" IS '글이 수정된 시간 (수정 시에만 사용됨)';

CREATE INDEX "idx_board_user_id" ON "board" ("user_id");
CREATE INDEX "idx_board_generated_time" ON "board" ("generated_time");

INSERT INTO board (board_subject, board_content, user_id, generated_time, modified_time)
VALUES
('첫 번째 자유글', '이 게시판은 자유롭게 글을 올릴 수 있습니다.', '73c2dd22-4f0f-4f83-a504-e99a2f843ca1', NOW(), NULL),
('두 번째 글', '자유롭게 질문을 남겨주세요.', '3819bf8c-3ad2-4da8-9d0d-d2a8e0cfd0e7', NOW(), NULL),
('수정 테스트', '이 글은 수정 시간을 가질 수도 있습니다.', 'eb1d91c6-0a8f-47e4-bf45-9179313ef904', NOW(), NOW());