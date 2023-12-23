import {
  configureStore,
  createListenerMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import checkUniqueReducer from "./slices/checkUnique/slice";
import emailVerificationReducer from "./slices/emailVerification/slice";
import createAccountReducer from "./slices/userAccount/createAccountSlice";
import loginReducer from "./slices/userAccount/login";
import resetPasswordReducer from "./slices/userAccount/resetPassword";
import courseReducer from "./slices/course/slice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    checkUnique: checkUniqueReducer,
    emailVerification: emailVerificationReducer,
    createAccount: createAccountReducer,
    login: loginReducer,
    resetPassword: resetPasswordReducer,
    course: courseReducer,
  },
  middleware: customizedMiddleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
