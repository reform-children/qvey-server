import { Router } from 'express'
import { getBooks } from '../controller/bookController'

const router = Router()
router.get('/', getBooks)
export default router
