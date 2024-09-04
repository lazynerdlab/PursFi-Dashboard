"use client";
import logo from "@/assets/logo.svg";
import {
  CustomInput as Input,
  CustomPasswordInput as PasswordInput,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "antd";
import { useLoginMutation } from "@/services/authService";
import {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import { useRouter } from "next/navigation";
import {
  useLazyProfileQuery,
  useLazyBusinessProfileQuery,
  useGenerateEmailOtpMutation,
} from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { logOutAction } from "@/store/userSlice";
import { useLazyGetSecurityDetailsQuery } from "@/services/securityService";

const initailState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useAppDispatch();
  const [loading, setIsLoading] = useState(false);
  const [generateEmailOtp] = useGenerateEmailOtpMutation();
  // useEffect(() => {
  //   dispatch(logOutAction());
  // }, []);
  const { replace } = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState(initailState);
  const [alert, setAlert] = useState("");
  const [getUserProfile, { isLoading: userProfileLoading }] =
    useLazyProfileQuery();
  const [getBusinessProfile, { isLoading: businessProfileLoading }] =
    useLazyBusinessProfileQuery();
    const [securityDetails,{}] = useLazyGetSecurityDetailsQuery();
    
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login({ ...formData, email: formData.email.toLowerCase() })
      .unwrap()
      .then((res) => {
        setIsLoading(false);
        getUserProfile({})
          .unwrap()
          .then((res) => {
            securityDetails(res?.user?.businessId)
            if (!res?.user?.businessId) {
              setIsLoading(false);
              replace("/signup-business");
              return;
            }
            if (!res?.user?.isEmailValidated) {
              setIsLoading(true);
              generateEmailOtp({ username: res?.user?.email })
                .unwrap()
                .finally(() => {
                  replace("/verifyEmail");
                  setIsLoading(false);
                });
              return;
            }
            setIsLoading(true);
            getBusinessProfile({})
              .unwrap()
              .then((res) => {
                if (!res?.business?.isOnboardingCompleted) {
                  replace("/onboarding");
                  return;
                }
                replace("/dashboard");
              })
              .finally(() => {
                setIsLoading(false);
              });
          });
      })
      .catch((err) => {
        console.log(err);
        setAlert(
          err?.data?.responseDescription ||
            err?.data?.title ||
            "something went wrong"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (alert) setAlert("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };
  return (
    <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA]">
      <nav className="py-4 px-8">
        <Image src={logo} alt="logo" />
      </nav>
      <main className=" flex flex-col items-center justify-center bg-white w-full md:w-[500px] mx-auto mt-4 p-6">
        {alert && <Alert type="error" closable message={alert} />}
        <h1 className="font-semibold text-2xl mb-2 text-[#000000]">
          Welcome Back !
        </h1>
        <p className=" text-gray-700 text-[18px]">
          Login to visit your dashboard
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-4">
          <div className="w-full flex flex-col items-start justify-start gap-[0.2rem]">
            <label
              htmlFor="email"
              className="text-[#181336] text-sm font-[500]"
            >
              Email Address
            </label>
            <Input
              className="w-full "
              placeholder="Email Address"
              id="email"
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[0.2rem]">
            <label
              htmlFor="password"
              className="text-[#181336] text-sm font-[500]"
            >
              Password
            </label>
            <PasswordInput
              className="w-full"
              placeholder="Enter your password"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            loading={loading}
            htmlType="submit"
            type="primary"
            className="!h-[3rem] !bg-black w-full"
          >
            Login
          </Button>
          <div className=" text-sm underline duration-300 text-gray-600 ">
            <Link href="forget-password">Forgot Password? </Link>{" "}
          </div>
          <span className="flex justify-center items-center mt-6">
            <p className="text-sm leading-6 text-gray-600">
              New to Purscliq Business?{" "}
              <Link
                href="signup"
                className="underline duration-300 cursor-pointer text-Primary"
              >
                {" "}
                Sign Up
              </Link>{" "}
            </p>
          </span>
        </form>
      </main>
    </div>
  );
};

export default Login;
