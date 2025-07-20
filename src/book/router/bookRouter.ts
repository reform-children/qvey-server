import { Router } from 'express'
import { createBook, getBooks } from '../controller/bookController'

const router = Router()
router.get('/', getBooks)
router.post('/', createBook)
export default router
