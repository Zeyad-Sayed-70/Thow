"use client";
import { useState, useEffect } from "react";
import { emailRegax } from "@/constants/regax";
import { createSessionToken } from "@/store/slices/userAccount/resetPassword";
import { AppDispatch, RootState } from "@/store/store";
import { fail_icon, success_icon } from "@/ui/Icons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { message } = useSelector((state: RootState) => state.resetPassword);

  const notValidEmailNotify = () =>
    toast("This Email is not valid", {
      position: "bottom-right",
      theme: "dark",
      closeButton: false,
      hideProgressBar: true,
      icon: fail_icon,
    });

  const sendedMessageNotify = () =>
    toast(message, {
      position: "bottom-right",
      theme: "dark",
      closeButton: false,
      hideProgressBar: true,
      icon: success_icon,
    });

  function handleSubmit(e: any) {
    e.preventDefault();

    const isEmailValid = email.match(emailRegax);

    if (isEmailValid) {
      dispatch(createSessionToken({ email }));
    } else {
      notValidEmailNotify();
    }
  }

  useEffect(() => {
    if (message) {
      localStorage.setItem("reset-password-email", email);
      sendedMessageNotify();
    }
  }, [message]);

  return (
    <form className="max-w-[600px] m-12 mx-auto px-6" onSubmit={handleSubmit}>
      <ToastContainer />
      <h1 className="text-xl mb-6">Reset Password</h1>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        autoComplete="email"
        placeholder="Enter Your Email"
        className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        disabled={!email}
        type="submit"
        className="rounded-md bg-primary disabled:bg-gray-400 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mt-6"
      >
        Send
      </button>
    </form>
  );
}
