import { pool } from '../db';

export interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export const getAllNotices = async (): Promise<Notice[]> => {
  const res = await pool.query('SELECT * FROM notices ORDER BY created_at DESC');
  return res.rows;
};

export const getNoticeById = async (id: number): Promise<Notice | undefined> => {
  const res = await pool.query('SELECT * FROM notices WHERE id = $1', [id]);
  return res.rows[0];
};

export const createNotice = async (payload: {
  title: string;
  content: string;
}): Promise<Notice> => {
  const { title, content } = payload;
  const res = await pool.query(
    'INSERT INTO notices (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return res.rows[0];
};

export const updateNotice = async (
  id: number,
  payload: { title: string; content: string }
): Promise<Notice | undefined> => {
  const { title, content } = payload;
  const res = await pool.query(
    'UPDATE notices SET title=$1, content=$2, updated_at=NOW() WHERE id=$3 RETURNING *',
    [title, content, id]
  );
  return res.rows[0];
};

export const deleteNotice = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM notices WHERE id = $1', [id]);
};