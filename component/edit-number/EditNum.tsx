"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import PhoneInput from "react-phone-input-2";
import { useRouter } from "next/navigation";
import { useState, FormEventHandler } from "react";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useGenerateOtpMutation } from "@/services/authService";
import { message, Alert } from "antd";
const EditNum = () => {
  const { replace } = useRouter();
  const [requestOtp, { isLoading }] = useGenerateOtpMutation();
  const [username, setUserName] = useState("");
  const [alert, setAlert] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    requestOtp({ username })
      .unwrap()
      .then((res) => {
        message.success(res.data?.responseDescription);
        setUserName("");
        replace("/signup-otp");
      })
      .catch((err) => {
        setAlert(err?.data?.responseDescription || err?.data?.title);
      });
  };
  return (
    <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px]">
      <nav className="py-4 px-8">
        <Image src={logo} alt="logo" />
      </nav>
      <main className=" flex flex-col items-center justify-center bg-white w-full md:w-[450px] mx-auto mt-4 p-6">
        {alert && <Alert type="error" closable message={alert} />}
        <h1 className="font-semibold text-xl mb-2 text-Primary">
          Edit Your Phone Number!{" "}
        </h1>
        <p className=" text-gray-700  text-center">
          Cross check your number or enter another phone number to receive your
          OTP{" "}
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-4">
          <PhoneInput
            country={"ng"}
            containerClass="!w-full"
            inputClass="phone-input-input !w-full !border !p-1 !rounded !bg-transparent"
            value={username}
            onChange={(value) => setUserName(value)}
          />
          <Button
            htmlType="submit"
            loading={isLoading}
            type="primary"
            className="!h-[3rem] !bg-Primary w-full"
          >
            Resend OTP
          </Button>
        </form>
      </main>
      <p className="flex justify-center my-8 text-gray-400 font-thin ">
        Terms of service. Having problem with login?
      </p>
    </div>
  );
};

export default EditNum;
