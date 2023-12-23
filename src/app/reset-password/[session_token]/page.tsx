"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import hash from "hash.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { redirect, useParams } from "next/navigation";
import { success_icon } from "@/ui/Icons";
import ErrorBox from "@/ui/ErrorBox";
import Link from "next/link";
import {
  resetPassword,
  verifySessionToken,
} from "@/store/slices/userAccount/resetPassword";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ password: string; confirm_password: string }>();

  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { message, isTokenValid } = useSelector(
    (state: RootState) => state.resetPassword
  );

  const resetPasswordNotify = () =>
    toast(message, {
      position: "bottom-right",
      theme: "dark",
      closeButton: false,
      hideProgressBar: true,
      icon: success_icon,
    });

  const { session_token } = useParams();

  useEffect(() => {
    setEmail(localStorage.getItem("reset-password-email") as string);
  }, []);

  useEffect(() => {
    if (email) {
      localStorage.removeItem("reset-password-email");
      dispatch(verifySessionToken({ email, token: session_token as string }));
    }
  }, [email]);

  function onSubmit(data: any) {
    // hash the password
    const newPassword = hash.sha256().update(data.password).digest("hex");

    // send request to reset password
    dispatch(resetPassword({ newPassword, email }));
  }

  useEffect(() => {
    if (message) {
      resetPasswordNotify();
      setTimeout(() => (location.href = "/login"), 1500);
    }
  }, [message]);

  if (isTokenValid === false)
    return (
      <div className="m-12 mx-auto w-fit">
        <ErrorBox message="Sorry, There is something wrong in this page." />
        <Link href={"/"} className="underline text-sm mx-auto block w-fit">
          Back to Home
        </Link>
      </div>
    );

  if (isTokenValid)
    return (
      <form
        className="max-w-[600px] m-12 mx-auto px-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ToastContainer />
        <h1 className="text-xl mb-6">Reset Password</h1>

        <div className="sm:col-span-12">
          <div className="mt-2">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              type="password"
              name="password"
              id="password"
              autoComplete="password"
              placeholder="Password"
              className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
          {errors.password && (
            <small className="px-2 text-xs text-red-700">
              {errors.password?.message}
            </small>
          )}

          <div className="mt-2">
            <input
              {...register("confirm_password", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") ? true : "Passwords do not match",
              })}
              type="password"
              name="confirm_password"
              id="confirm password"
              placeholder="Confirm Password"
              className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
          {errors.confirm_password && (
            <small className="px-2 text-xs text-red-700">
              {errors.confirm_password?.message}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="rounded-md bg-primary disabled:bg-gray-400 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mt-6"
        >
          Reset
        </button>
      </form>
    );
}
