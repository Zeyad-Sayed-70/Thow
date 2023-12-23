import express from "express";
import { createNewAccount } from "../../controllers/user/createAccount";
import { checkEmail, checkUsername } from "../../controllers/user/checkUnique";

const router = express.Router();

router.route("/create").post(createNewAccount);
router.route("/check/username").get(checkUsername);
router.route("/check/email").get(checkEmail);

export default router;
