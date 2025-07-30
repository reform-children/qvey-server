import { Router } from 'express'
import { createBook, deleteBook, updateBook, getBooks } from '../controller/bookController'

const router = Router()
router.get('/', getBooks)
router.post('/', createBook)
router.delete('/:bookId', deleteBook)
router.patch('/:bookId', updateBook)
export default router
