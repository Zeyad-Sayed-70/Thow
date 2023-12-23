import Link from "next/link";
import React, { useEffect, Suspense, lazy } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { login } from "@/store/slices/userAccount/login";
import { toast } from "react-toastify";
import { success_icon } from "@/ui/Icons";
import ErrorBox from "@/ui/ErrorBox";
import { emailRegax } from "@/constants/regax";
import hash from "hash.js";

type Inputs = {
  email: string;
  password: string;
};

const OtherPlatformsLogin = lazy(
  () => import("@/components/OtherPlatformsLogin")
);

export default function Form({ waiting }: { waiting: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [rememberMe, setRememberMe] = React.useState(true);

  const { canLogin, token, message, isLoading } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch<AppDispatch>();

  const loginNotify = () =>
    toast(message, {
      position: "bottom-right",
      theme: "dark",
      closeButton: false,
      hideProgressBar: true,
      icon: success_icon,
    });

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    if (canLogin) return;

    // hash the password
    const hashed_pass = hash.sha256().update(data.password).digest("hex");

    // Login
    dispatch(login({ email: data.email, password: hashed_pass }));
  };

  useEffect(() => {
    if (canLogin === null) return;

    if (canLogin && token) {
      // save the user-token and then redirect to home page
      window.localStorage.setItem("user-account-token", token);

      // show successful notification
      loginNotify();

      setTimeout(() => (window.location.href = "/"), 2000);
    }
  }, [canLogin, isLoading]);

  useEffect(() => {
    console.clear();
  }, []);

  return (
    <div className="border-b border-gray-900/10 p-12 flex-1 overflow-auto">
      <h2 className="text-3xl leading-7 text-gray-900">Login</h2>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <form className="sm:col-span-12" onSubmit={handleSubmit(onSubmit)}>
          {canLogin === false && message && <ErrorBox message={message} />}
          <div className="sm:col-span-12">
            <div className="mt-2">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: emailRegax,
                    message: "Enter a valid email address",
                  },
                })}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email ex: example@gmail.com"
                className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email && (
              <small className="px-2 text-xs text-red-700">
                {errors.email?.message}
              </small>
            )}
          </div>

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
          </div>

          <div className="mt-6 gap-3 flex flex-wrap justify-between items-center">
            <div className="relative flex items-center gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  onClick={(e) =>
                    setRememberMe((e.target as HTMLFormElement).checked)
                  }
                  id="rememberme"
                  name="rememberme"
                  checked={rememberMe}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-dark focus:ring-primary"
                />
              </div>

              <label
                htmlFor="rememberme"
                className="font-medium text-sm  text-gray-900"
              >
                Remember Me
              </label>
            </div>

            <Link
              href="/register"
              className="text-sm text-gray-900 hover:underline"
            >
              I don't have account!
            </Link>
          </div>

          <section className="flex flex-wrap justify-center items-center gap-6 my-12">
            <button
              disabled={waiting}
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Sign In
            </button>
            <Link
              href="/reset-password"
              className="text-sm leading-6 text-gray-900 hover:underline"
            >
              Forgot password?
            </Link>
          </section>

          <hr />
          <section className="mt-12">
            <span className="text-2xl">Or Join With</span>
            <Suspense fallback={<></>}>
              <OtherPlatformsLogin />
            </Suspense>
          </section>
        </form>
      </div>
    </div>
  );
}
