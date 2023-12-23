import { app } from "../app";
import AuthRouter from "./auth/auth";
import userAccountRouter from "./user/userAccount";
import resetPasswordRouter from "./user/resetPassword";
import courseRouter from "./course/course";

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user/account", userAccountRouter);
app.use("/api/v1/user/account/reset-password", resetPasswordRouter);
app.use("/api/v1/course", courseRouter);
