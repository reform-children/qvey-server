import { Router } from 'express'
import { createBoard, getBoardList } from '../controller/boardController'

const router = Router()
router.get('/', getBoardList)
router.post('/', createBoard)

export default router
