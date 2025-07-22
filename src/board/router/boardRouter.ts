import { Router } from 'express'
import { createBoard, getBoardList, deleteBoard} from '../controller/boardController'

const router = Router()
router.get('/', getBoardList)
router.post('/', createBoard)
router.delete('/:id', deleteBoard)

export default router
