import express from "express";
import {
  createSessionToken,
  resetPassword,
  verifySessionToken,
} from "../../controllers/auth/login";

const router = express.Router();

router.route("/create-token").post(createSessionToken);
router.route("/verify-token").post(verifySessionToken);
router.route("/reset").post(resetPassword);

export default router;
