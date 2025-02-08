import express from "express";
import { AuthorController } from "../controllers/author.controller.js";
import { CreateAuthorDto } from "../dto/authors/create-author.dto.js";
import { UpdateAuthorDto } from "../dto/authors/update-author.dto.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/auth.js";
import { roles } from "../middlewares/roles.js";

const router = express.Router();
const authorController = new AuthorController();

// Read operations public
router.get("/", authorController.getAuthors.bind(authorController));
router.get("/:id", authorController.getAuthor.bind(authorController));

// Write operations protected
router.use(authenticate, roles(["Admin", "Librarian"]));

router.post(
  "/",
  validateRequest(CreateAuthorDto),
  authorController.createAuthor.bind(authorController)
);
router.put(
  "/:id",
  validateRequest(UpdateAuthorDto),
  authorController.updateAuthor.bind(authorController)
);
router.delete("/:id", authorController.deleteAuthor.bind(authorController));

export default router;
