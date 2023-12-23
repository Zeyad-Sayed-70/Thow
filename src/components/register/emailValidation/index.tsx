import { Inputs } from "@/app/register/page";
import { checkVerificationCodeValid } from "@/store/slices/emailVerification/slice";
import { AppDispatch, RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactInputVerificationCode from "react-input-verification-code";
import ErrorBox from "@/ui/ErrorBox";
import { createAccount } from "@/store/slices/userAccount/createAccountSlice";
import hash from "hash.js";
import { toast } from "react-toastify";
import { fail_icon, success_icon } from "@/ui/Icons";
import "./index.css";

export default function index({
  step,
  userData,
}: {
  step: number;
  userData: Inputs | null;
}) {
  const [codes, setCodes] = React.useState("");
  const [leftChances, setLeftChances] = React.useState(3);

  const { isValid, isLoading } = useSelector(
    (state: RootState) => state.emailVerification
  );

  const {
    token,
    message,
    isLoading: isCreateAccountLoading,
  } = useSelector((state: RootState) => state.createAccount);

  const createdAccountNotify = () =>
    toast(message, {
      position: "bottom-right",
      theme: "dark",
      closeButton: false,
      hideProgressBar: true,
      icon: success_icon,
    });

  const leftChancesNotify = () =>
    toast(
      "It seems you've entered an invalid verification code multiple times. For security reasons, we are refreshing the page.",
      {
        position: "bottom-right",
        theme: "dark",
        closeButton: false,
        hideProgressBar: true,
        icon: fail_icon,
      }
    );

  const dispatch = useDispatch<AppDispatch>();

  const handleVerify = (code: string) => {
    if (!userData?.email || leftChances === 0 || isValid) return;

    // -1 from left chances
    setLeftChances((prev) => prev - 1);

    dispatch(
      checkVerificationCodeValid({
        email: userData.email,
        verificationCode: code,
      })
    );
  };

  React.useEffect(() => {
    if (isValid) {
      if (!userData?.email) return;
      // hash password
      const hashed_pass = hash.sha256().update(userData.password).digest("hex");

      dispatch(
        createAccount({
          username: userData.username,
          email: userData.email,
          password: hashed_pass,
        })
      );
    }
  }, [isValid, isLoading]);

  React.useEffect(() => {
    if (token) {
      // save the user-token and then redirect to home page
      window.localStorage.setItem("user-account-token", token);

      // show successful notification
      createdAccountNotify();

      setTimeout(() => (window.location.href = "/"), 2000);
    }
  }, [token, isCreateAccountLoading]);

  React.useEffect(() => {
    if (leftChances === 0) {
      leftChancesNotify();
      setTimeout(() => window.location.reload(), 5000);
    }
  }, [leftChances]);

  React.useEffect(() => {
    console.clear();
  }, []);

  return (
    <div className={`${step === 0 ? "hidden" : "block"} w-full md:px-12`}>
      <h2 className="text-3xl leading-7 text-gray-900 text-center mt-12 mb-6 block">
        Email Verification
      </h2>

      <VerificationMessage userEmail={userData?.email as string} />

      {isValid === false && (
        <div className="mt-6 w-96 mx-auto">
          <ErrorBox
            message={`This verification code is not correct, you have ${leftChances} left chances.`}
          />
        </div>
      )}

      <h3 className="text-xl leading-7 text-gray-900 text-center mt-20 mb-6 block">
        Verification Code:
      </h3>

      <div className="mx-auto w-fit flex items-center">
        <ReactInputVerificationCode
          placeholder=""
          autoFocus
          length={6}
          onCompleted={handleVerify}
          onChange={(e) => setCodes(e)}
        />
      </div>

      <button
        disabled={codes.length !== 6}
        onClick={() => handleVerify(codes)}
        className="px-4 py-2 rounded bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white block mx-auto mt-12 w-fit"
      >
        Verify
      </button>
    </div>
  );
}

const VerificationMessage = ({ userEmail }: { userEmail: string }) => {
  return (
    <div className="text-center px-6 text-black-v">
      <p>We've sent a verification code to your email address:</p>
      <p>
        <strong>{userEmail}</strong>
      </p>
      <p>
        Please check your inbox and enter the code to complete the verification
        process.
      </p>
    </div>
  );
};
