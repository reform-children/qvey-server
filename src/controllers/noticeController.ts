import { RequestHandler } from 'express';
import * as model from '../models/noticeModel';

/** 전체 공지 조회 */
export const listNotices: RequestHandler = async (req, res, next) => {
  try {
    const notices = await model.getAllNotices();
    res.json({ data: notices });
    // return;   ← 불필요, 함수가 끝나면 void 반환
  } catch (err) {
    next(err);
  }
};

/** 단일 공지 상세 조회 */
export const getNotice: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const notice = await model.getNoticeById(id);
    if (!notice) {
      res.status(404).json({ error: 'Not found' });
      return;    // void 반환
    }
    res.json({ data: notice });
  } catch (err) {
    next(err);
  }
};

/** 공지 생성 */
export const createNotice: RequestHandler = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content required' });
    return;
  }
  try {
    const newNotice = await model.createNotice({ title, content });
    res.status(201).json({ data: newNotice });
  } catch (err) {
    next(err);
  }
};

/** 공지 수정 */
export const updateNotice: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content required' });
    return;
  }
  try {
    const updated = await model.updateNotice(id, { title, content });
    if (!updated) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

/** 공지 삭제 */
export const deleteNotice: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    await model.deleteNotice(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
