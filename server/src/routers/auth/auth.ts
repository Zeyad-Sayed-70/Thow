import express from "express";
import {
  sendValidationCode,
  checkCodeValidation,
} from "../../controllers/auth/verifyEmail";
import { checkTokensValidation } from "../../controllers/auth/checkTokensValidation";
import { login } from "../../controllers/auth/login";

const router = express.Router();

router.route("/login").post(login);
router.route("/verification/email").post(sendValidationCode);
router.route("/verification/email/check").post(checkCodeValidation);
router.route("/token/check").post(checkTokensValidation);

export default router;
