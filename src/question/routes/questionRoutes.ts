import { Router } from "express";
import * as questionController from "../controllers/questionController";

const router = Router();

router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);
router.get("/book/:book_id", questionController.getQuestionsByBookId);
router.post("/", questionController.createQuestion);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);

export default router;
