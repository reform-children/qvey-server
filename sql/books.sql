CREATE TABLE "books" (
	"book_id" SERIAL NOT NULL,
	"user_id" VARCHAR NOT NULL,
	"book_title" VARCHAR NOT NULL,
	"book_description" VARCHAR NOT NULL,
	"generate_time" TIMESTAMP NOT NULL DEFAULT now(),
	"modified_time" TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY ("book_id")
)
;
COMMENT ON COLUMN "books"."book_id" IS '';
COMMENT ON COLUMN "books"."user_id" IS '';
COMMENT ON COLUMN "books"."book_title" IS '';
COMMENT ON COLUMN "books"."book_description" IS '';
COMMENT ON COLUMN "books"."generate_time" IS '';
COMMENT ON COLUMN "books"."modified_time" IS '';
CREATE INDEX "idx_books_user_id" ON "books" ("user_id");
CREATE INDEX "book_id" ON "books" ("book_id");


INSERT INTO "books" ("book_id", "user_id", "book_title", "book_description", "generate_time", "modified_time") VALUES
	(1, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', '책 제목1', '책 내용2', '2025-07-20 04:23:24.565737', NULL),
	(2, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'The Art of PostgreSQL', 'A deep dive into PostgreSQL best practices.', '2025-07-20 04:26:55.656581', NULL),
	(3, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'Learning SQL', 'An introductory guide to writing SQL queries.', '2025-07-20 04:26:55.656581', NULL),
	(4, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'Advanced SQL Techniques', 'Master-level tips for query optimization.', '2025-07-20 04:26:55.656581', NULL),
	(5, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'Database Design Patterns', 'Common patterns for designing scalable schemas.', '2025-07-20 04:26:55.656581', NULL),
	(6, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'Effective Indexing', 'How to create efficient indexes in relational databases.', '2025-07-20 04:26:55.656581', NULL),
	(7, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'PostgreSQL Internals', 'Exploring the internals of the PostgreSQL engine.', '2025-07-20 04:26:55.656581', NULL),
	(8, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'SQL for Data Analysis', 'Using SQL to explore and analyze data sets.', '2025-07-20 04:26:55.656581', NULL),
	(9, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'Relational Theory Explained', 'Fundamentals of the relational data model.', '2025-07-20 04:26:55.656581', NULL),
	(11, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', 'Backup and Restore in PostgreSQL', 'Techniques to safely back up and restore databases.', '2025-07-20 04:26:55.656581', NULL),
	(12, 'd2d5f58c-e9a7-4215-a82e-e594a72b1ec2', '등록 테스트 제목', '등록 테스트 내용', '2025-07-20 09:56:13.720631', NULL);