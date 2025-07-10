import { Router } from 'express';
import * as noticeController from '../controllers/noticeController';

const router = Router();

router.get   ('/',    noticeController.listNotices);
router.get   ('/:id', noticeController.getNotice);
router.post  ('/',    noticeController.createNotice);
router.put   ('/:id', noticeController.updateNotice);
router.delete('/:id', noticeController.deleteNotice);

export default router;
