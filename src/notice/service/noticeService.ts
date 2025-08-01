import { NoticeRepository } from '../repository/noticeRepository'
import { CreateNoticeDTO, UpdateNoticeDTO } from '../dto/noticeDTO'

const noticeRepo = new NoticeRepository()

export class noticeService {
    async getNotices() {
        return await noticeRepo.findAll()
    }

    async getNotice(id: number) {
        return await noticeRepo.findById(id)
    }

    async createNotice(dto: CreateNoticeDTO) {
        return await noticeRepo.create(dto.title, dto.content)
    }

    async updateNotice(id: number, dto: UpdateNoticeDTO) {
        const notice = await noticeRepo.findById(id)
        if (!notice) return null
        return await noticeRepo.update(id, dto.title ?? notice.title, dto.content ?? notice.content)
    }

    async deleteNotice(id: number) {
        return await noticeRepo.delete(id)
    }
}
