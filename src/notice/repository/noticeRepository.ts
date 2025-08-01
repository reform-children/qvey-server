import { pool } from '../../db';
import { Notice } from '../entity/noticeEntity';

export class NoticeRepository {
    async findAll(): Promise<Notice[]>{ // 전체 공지 조회 (최신순이니까 id 내림차순)
        const result = await pool.query(
            'SELECT * FROM notices ORDER BY id DESC'
        );
        return result.rows;
    }

    async findById(id: number): Promise<Notice | null> { // id를 이용해서 공지 찾기
        const result = await pool.query(
            'SELECT * FROM notices WHERE id = $1', [id]
        );
        return result.rows[0] || null;
    }

    async create(title: string, content: string): Promise<Notice>{ // 공지 생성하기
        const result = await pool.query(
            'INSERT INTO notices (title, content) VALUES ($1, $2) RETURNING *', [title, content]
        );
        return result.rows[0];
    }
}