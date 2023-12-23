"use client";
import Image from "next/image";
import React, { lazy } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContext } from "@/context/Authentication";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import Form from "@/components/Login/form";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  {
    ssr: false,
  }
);

export default function page() {
  const { isAuthenticated } = AuthContext();

  // Redirect to home page if you have logined
  if (isAuthenticated) {
    return redirect("/");
  }

  if (isAuthenticated === null) return <>Loading...</>;

  const [waiting, setWaiting] = React.useState(true);
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

  React.useEffect(() => {
    setTimeout(() => setWaiting(false), 1000);
  });

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ToastContainer />
      <main className="flex" style={{ height: "calc(100vh - 56px)" }}>
        <Image
          alt="photo"
          src={"/assets/OIG.vKLFI7Sx6L.WA6uUC.jpg"}
          width={600}
          height={600}
          className="hidden md:block h-full object-cover w-[50%]"
        />

        <Form waiting={waiting} />
      </main>
    </GoogleOAuthProvider>
  );
}
