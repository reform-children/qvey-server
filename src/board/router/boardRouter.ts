import { Router } from 'express'
import { getBoardList } from '../controller/boardController'

const router = Router()
router.get('/', getBoardList)

export default router
