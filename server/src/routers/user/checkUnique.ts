import express from "express";
import { checkEmail, checkUsername } from "../../controllers/user/checkUnique";
import { checkTokensValidation } from "../../controllers/auth/checkTokensValidation";

const router = express.Router();

router.route("/username").get(checkUsername);
router.route("/email").get(checkEmail);
router.route("/token").post(checkTokensValidation);

export default router;
