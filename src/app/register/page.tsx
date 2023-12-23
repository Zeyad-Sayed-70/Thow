"use client";
import Image from "next/image";
import React, { lazy, Suspense } from "react";
import RegisterForm from "@/components/register/form/index";
import { redirect } from "next/navigation";
import { AuthContext } from "@/context/Authentication";
import { GoogleOAuthProvider } from "@react-oauth/google";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  {
    ssr: false,
  }
);

const EmailValidation = lazy(
  () => import("@/components/register/emailValidation")
);

export type Inputs = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export default function page() {
  const [step, setStep] = React.useState(0);
  const [userData, setUserData] = React.useState<Inputs | null>(null);
  const { isAuthenticated } = AuthContext();

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

  if (isAuthenticated) {
    return redirect("/");
  }

  if (isAuthenticated === false)
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ToastContainer />
        <main className="flex" style={{ height: "calc(100vh - 56px)" }}>
          <Image
            alt="photo"
            src={"/assets/OIG (4).jpg"}
            width={600}
            height={600}
            quality={100}
            className="hidden md:block h-full object-cover w-[50%]"
          />

          <RegisterForm
            step={step}
            setStep={setStep}
            userData={userData}
            setUserData={setUserData}
          />
          {step === 1 && (
            <Suspense>
              <EmailValidation step={step} userData={userData} />
            </Suspense>
          )}
        </main>
      </GoogleOAuthProvider>
    );
}
