import { createAccount } from "@/store/slices/userAccount/createAccountSlice";
import { AppDispatch, RootState } from "@/store/store";
import { success_icon } from "@/ui/Icons";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import React from "react";
import ReactFacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function OtherPlatformsLogin() {
  const { token, message, isLoading } = useSelector(
    (state: RootState) => state.createAccount
  );
  const dispatch = useDispatch<AppDispatch>();

  const createdAccountNotify = () =>
    toast(message, {
      position: "bottom-right",
      className: "bg-black-v text-white-v",
      bodyClassName: "bg-black-v",
      closeButton: false,
      hideProgressBar: true,
      icon: success_icon,
    });

  React.useEffect(() => {
    if (token) {
      // save the user-token and then redirect to home page
      window.localStorage.setItem("user-account-token", token);

      // show successful notification
      createdAccountNotify();

      setTimeout(() => (window.location.href = "/"), 2000);
    }
  }, [token, isLoading]);

  const responseMessage = (response: any) => {
    // This is the JWT token
    const token = response.credential;
    // This will decode the token and get the user data
    const userData: any = jwtDecode(token);
    // create user account
    dispatch(
      createAccount({
        username: userData.name,
        email: userData.email,
        by: "google",
      })
    );
  };

  const errorMessage = () => {
    console.error(
      "There is something goes wrong when trying to login using Google."
    );
  };
  return (
    <div className="flex flex-wrap gap-6 mt-6">
      <div>
        <GoogleLogin
          text="signin_with"
          theme="filled_black"
          shape="square"
          size="large"
          onSuccess={responseMessage}
          onError={errorMessage}
        />
      </div>
      <div>
        <ReactFacebookLogin
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 48 48"
            >
              <linearGradient
                id="awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1"
                x1="6.228"
                x2="42.077"
                y1="4.896"
                y2="43.432"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#0d61a9"></stop>
                <stop offset="1" stopColor="#16528c"></stop>
              </linearGradient>
              <path
                fill="url(#awSgIinfw5_FS5MLHI~A9a_yGcWL8copNNQ_gr1)"
                d="M42,40c0,1.105-0.895,2-2,2H8c-1.105,0-2-0.895-2-2V8c0-1.105,0.895-2,2-2h32	c1.105,0,2,0.895,2,2V40z"
              ></path>
              <path
                d="M25,38V27h-4v-6h4v-2.138c0-5.042,2.666-7.818,7.505-7.818c1.995,0,3.077,0.14,3.598,0.208	l0.858,0.111L37,12.224L37,17h-3.635C32.237,17,32,18.378,32,19.535V21h4.723l-0.928,6H32v11H25z"
                opacity=".05"
              ></path>
              <path
                d="M25.5,37.5v-11h-4v-5h4v-2.638c0-4.788,2.422-7.318,7.005-7.318c1.971,0,3.03,0.138,3.54,0.204	l0.436,0.057l0.02,0.442V16.5h-3.135c-1.623,0-1.865,1.901-1.865,3.035V21.5h4.64l-0.773,5H31.5v11H25.5z"
                opacity=".07"
              ></path>
              <path
                fill="#fff"
                d="M33.365,16H36v-3.754c-0.492-0.064-1.531-0.203-3.495-0.203c-4.101,0-6.505,2.08-6.505,6.819V22h-4v4	h4v11h5V26h3.938l0.618-4H31v-2.465C31,17.661,31.612,16,33.365,16z"
              ></path>
            </svg>
          }
          textButton="Sign in with Facebook"
          cssClass="h-[40px] text-white text-sm bg-black p-1 px-2 font-bold flex items-center gap-3 transition hover:bg-black-v rounded"
          appId="727465228807320"
          fields="name,email,picture"
          callback={(userInfo) => console.log(userInfo)}
        />
      </div>
    </div>
  );
}
