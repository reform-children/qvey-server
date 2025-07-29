CREATE TABLE "users" (
	"user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
	"user_email" VARCHAR(100) NOT NULL,
	"user_name" VARCHAR(100) NOT NULL,
	"user_password" VARCHAR(100) NOT NULL,
	"user_profile_image" VARCHAR(256) NULL DEFAULT NULL::character varying,
	"user_birth" DATE NOT NULL,
	"user_gender" CHAR(1) NOT NULL,
	"user_address" VARCHAR(256) NULL DEFAULT NULL::character varying,
	"user_address_detail" VARCHAR(256) NULL DEFAULT NULL::character varying,
    "user_tell" VARCHAR(100) NULL DEFAULT NULL,
	"user_status" CHAR(1) NOT NULL DEFAULT 'N',
	"password_update_time" TIMESTAMP NULL DEFAULT now(),
	"last_login_time" TIMESTAMP NULL DEFAULT NULL,
    "generate_time" TIMESTAMP NULL DEFAULT now(),
	"modified_time" TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY ("user_id"),
	UNIQUE ("user_email")
)
;
COMMENT ON COLUMN "users"."user_id" IS '';
COMMENT ON COLUMN "users"."user_email" IS '';
COMMENT ON COLUMN "users"."user_name" IS '';
COMMENT ON COLUMN "users"."user_password" IS '';
COMMENT ON COLUMN "users"."user_profile_image" IS '';
COMMENT ON COLUMN "users"."user_birth" IS '';
COMMENT ON COLUMN "users"."user_gender" IS '';
COMMENT ON COLUMN "users"."user_address" IS '';
COMMENT ON COLUMN "users"."user_address_detail" IS '';
COMMENT ON COLUMN "users"."generate_time" IS '';
COMMENT ON COLUMN "users"."modified_time" IS '';
COMMENT ON COLUMN "users"."user_status" IS '';
COMMENT ON COLUMN "users"."password_update_time" IS '';
COMMENT ON COLUMN "users"."last_login_time" IS '';
COMMENT ON COLUMN "users"."user_tell" IS '';
CREATE INDEX "user_id" ON "users" ("user_id");
CREATE INDEX "user_email" ON "users" ("user_email");
