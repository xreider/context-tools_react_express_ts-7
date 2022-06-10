import app from "express";
import { forAuthed, forNotAuthed } from "middlewares/checkers/auth.checker";
import {
  emailValidator,
  signupValidator,
} from "middlewares/validators/auth.validator";
import {
  checkIfUserExistsByEmail,
  createUserAuthController,
} from "routes/controllers/auth.controller";
import {
  getUserAuthController,
  loginUserController,
  deleteUserSessionController,
} from "routes/controllers/auth.controller";
const router = app.Router();

router.get("/", getUserAuthController);
router.post(
  "/checkIfUserExistsByEmail",
  emailValidator,
  checkIfUserExistsByEmail
);
router.put("/", forNotAuthed, loginUserController);
router.delete("/", forAuthed, deleteUserSessionController);
router.post("/", forNotAuthed, signupValidator, createUserAuthController);

module.exports = router;
