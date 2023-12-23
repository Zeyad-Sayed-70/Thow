import { Inputs } from "@/app/register/page";
import {
  checkEmailUniqueness,
  checkUsernameUniqueness,
} from "@/store/slices/checkUnique/slice";
import { sendVerificationCode } from "@/store/slices/emailVerification/slice";
import { AppDispatch, RootState } from "@/store/store";
import ErrorBox from "@/ui/ErrorBox";
import Link from "next/link";
import React, { Suspense, lazy } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const OtherPlatformsLogin = lazy(
  () => import("@/components/OtherPlatformsLogin")
);

const emailRegax = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@gmail+(?:\.com+)/gm;

export default function index({
  step,
  setStep,
  userData,
  setUserData,
}: {
  step: number;
  setStep: (step: number) => void;
  userData: Inputs | null;
  setUserData: (userData: Inputs | null) => void;
}) {
  const [confirmTerms, setConfirmTerms] = React.useState(false);
  const [waiting, setWaiting] = React.useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { isUsernameUnique, isEmailUnique, isLoading } = useSelector(
    (state: RootState) => state.checkUnique
  );
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
    if (!confirmTerms) return;

    // Send request to server to check if the username and email are unique
    dispatch(checkUsernameUniqueness(data.username));
    dispatch(checkEmailUniqueness(data.email));

    // store data
    setUserData(data);
  };

  React.useEffect(() => {
    // when username and email are unique
    if (isUsernameUnique && isEmailUnique) {
      // send a verification code to user
      if (!userData?.email) return;

      dispatch(
        sendVerificationCode({
          email: userData.email,
          username: userData.username,
        })
      );

      // move to the next step
      setStep(1);
    }
  }, [isUsernameUnique, isEmailUnique, userData]);

  React.useEffect(() => {
    setTimeout(() => setWaiting(false), 1000);
  }, []);

  return (
    <div
      className={`${
        step === 0 ? "block" : "hidden"
      } border-b border-gray-900/10 p-12 flex-1 overflow-auto`}
    >
      <h2 className="text-3xl leading-7 text-gray-900">Register</h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <form className="sm:col-span-12" onSubmit={handleSubmit(onSubmit)}>
          {isUsernameUnique === false && (
            <ErrorBox message="This username is already used, Try another one" />
          )}
          {isEmailUnique === false && (
            <ErrorBox message="This email is already used, Try another one" />
          )}
          <div className="sm:col-span-12">
            <div className="mt-2">
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long",
                  },
                })}
                id="username"
                name="username"
                type="text"
                autoComplete="name"
                placeholder="Username"
                className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
            {errors.username && (
              <small className="px-2 text-xs text-red-700">
                {errors.username?.message}
              </small>
            )}
          </div>

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

            <div className="mt-2">
              <input
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password")
                      ? true
                      : "Passwords do not match",
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

            <div className="mt-6 gap-3 flex flex-wrap justify-between items-center">
              <div className="relative flex items-center gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    onClick={(e) =>
                      setConfirmTerms((e.target as HTMLFormElement).checked)
                    }
                    id="rememberme"
                    name="rememberme"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-dark focus:ring-primary"
                  />
                </div>

                <label
                  htmlFor="rememberme"
                  className="font-medium text-sm  text-gray-900"
                >
                  I confirm the policy conditions
                </label>
              </div>

              <Link
                href="/login"
                className="text-sm text-gray-900 hover:underline"
              >
                I already have account
              </Link>
            </div>

            <section className="flex flex-wrap justify-center items-center gap-6 my-12">
              <button
                disabled={waiting || !confirmTerms}
                type="submit"
                className="rounded-md bg-primary disabled:bg-gray-400 px-4 py-2 text-md font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Register
              </button>
            </section>

            <hr />
            <section className="mt-12">
              <span className="text-2xl">Or Join With</span>
              <Suspense fallback={<></>}>
                <OtherPlatformsLogin />
              </Suspense>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}
