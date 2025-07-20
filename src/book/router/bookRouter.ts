import { Router } from 'express'
import { createBook, deleteBook, getBooks } from '../controller/bookController'

const router = Router()
router.get('/', getBooks)
router.post('/', createBook)
router.delete('/:bookId', deleteBook)
export default router
