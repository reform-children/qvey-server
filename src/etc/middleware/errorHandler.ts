/**
 * TODO : Error Status 500으로 하드 코딩 되어있는데 Error 에서 받아서 return 해야함
 */
import { NextFunction, Request, Response } from 'express'
import { ErrorResponseDTO } from '../dto/errorDTO'

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const response: ErrorResponseDTO = {
        message: err.message ?? 'internal server error',
        status: 500,
        success: false,
    }
    res.status(500).json(response)
}
