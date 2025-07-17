import { pool } from '../../db';

export interface Notice {
  notice_id:       number;
  user_id:         string;
  notice_title:    string;
  notice_content:  string;
  notice_type:     string;
  is_pinned:       boolean;
  view_count:      number;
  generate_time:   Date;    // 여기
  modified_time:   Date;    // 여기
  notice_status:   string;
}

/** 전체 공지 조회 (노출 중인 것만, 고정순 ↓ + 생성시간 순 ↓) */
export const getAllNotices = async (): Promise<Notice[]> => {
  const res = await pool.query(
    `SELECT *
       FROM notice
      WHERE notice_status = 'N'
      ORDER BY is_pinned DESC, generate_time DESC`  // ✅ generate_time 으로 교체
  );
  return res.rows;
};

/** 단일 공지 조회 */
export const getNoticeById = async (id: number): Promise<Notice|undefined> => {
  const res = await pool.query(
    `SELECT *
       FROM notice
      WHERE notice_id = $1
        AND notice_status = 'N'`,
    [id]
  );
  return res.rows[0];
};

/** 공지 생성 */
export const createNotice = async (payload: {
  user_id:        string;
  notice_title:   string;
  notice_content: string;
  notice_type:    string;
  is_pinned?:     boolean;
}): Promise<Notice> => {
  const { user_id, notice_title, notice_content, notice_type, is_pinned = false } = payload;
  const res = await pool.query(
    `INSERT INTO notice
       ( user_id, notice_title, notice_content, notice_type, is_pinned, view_count, notice_status )
     VALUES
       ($1,         $2,           $3,             $4,          $5,        0,          'N')
     RETURNING *`,
    [user_id, notice_title, notice_content, notice_type, is_pinned]
  );
  return res.rows[0];
};

/** 공지 수정 (선택적 필드 + modified_time 갱신) */
export const updateNotice = async (
  id: number,
  payload: {
    notice_title?:   string;
    notice_content?: string;
    notice_type?:    string;
    is_pinned?:      boolean;
    notice_status?:  string;
  }
): Promise<Notice|undefined> => {
  const { notice_title, notice_content, notice_type, is_pinned, notice_status } = payload;
  const res = await pool.query(
    `UPDATE notice
        SET notice_title   = COALESCE($2, notice_title),
            notice_content = COALESCE($3, notice_content),
            notice_type    = COALESCE($4, notice_type),
            is_pinned      = COALESCE($5, is_pinned),
            notice_status  = COALESCE($6, notice_status),
            modified_time  = NOW()                -- ✅ modified_time 으로 갱신
      WHERE notice_id = $1
      RETURNING *`,
    [id, notice_title, notice_content, notice_type, is_pinned, notice_status]
  );
  return res.rows[0];
};

/** 공지 삭제→soft delete */
export const deleteNotice = async (id: number): Promise<void> => {
  await pool.query(
    `UPDATE notice
        SET notice_status = 'D',
            modified_time = NOW()               -- ✅ modified_time 으로 갱신
      WHERE notice_id = $1`,
    [id]
  );
};
