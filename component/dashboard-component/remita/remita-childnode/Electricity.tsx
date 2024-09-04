"use client";
import RemitaIcon from "@/assets/icon/RemitaIcon";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import {
  CustomInput as Input,
  CustomButton as Button,
  CustomSelect as Select,
  CustomRadioGroup as RadioGroup,
  CustomDatePicker as DatePicker,
  CustomTimePicker as TimePicker,
} from "@/lib/AntdComponents";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import dayjs from "dayjs";
const Electricity = () => {
  const { back } = useRouter();

  const options = [
    { label: "instant payment", value: "instant_payment" },
    { label: "Schedule Payment", value: "schedule_payment" },
    { label: "Recurring payment", value: "recurring_payment" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="mx-auto flex flex-col py-2 px-6 h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center my-6">
        <span>
          <span className="text-2xl font-medium flex gap-3 items-center mb-2">
            <GrFormPreviousLink className="cursor-pointer" onClick={back} />
            <h2 className="text-[18px] font-bold">Buy Electricity</h2>
          </span>
          <p className="text-[16px] text-gray-600">
            you can create one time payment, recurring or Schedule payment
          </p>
        </span>
        <div className="flex items-center space-x-3">
          <button className="btn btn-md  bg-gray-200 hover:bg-gray-200 text-white text-sm normal-case">
            Make Payment
          </button>
          <button className="btn btn-md  border border-gray-400 bg-white hover:bg-white text-black text-sm normal-case">
            Cancel
          </button>
        </div>
      </header>
      <div className="grid grid-cols-[300px_500px] gap-[2rem] items-start px-[2em] mt-5">
        <div className="flex items-center gap-[0.5rem]">
          <span className="text-[12px] font-[400] text-white py[2%] px-[2%] rounded-full bg-black">
            1
          </span>
          <p className="text-inherit text[#181336] text-[16px] font-[600]">
            Select Disco
          </p>
        </div>
        <div className="flex flex-col space-y-4 w-full ">
          <span className="flex space-x-3">
            <RemitaIcon />
            <p className="text-[24px] font-bold">Buy Electricity</p>
          </span>
          <form className="w-full space-y-4 mt-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="product"
              >
                Select Product
              </label>
              <Select
                className="!w-full !h-[2.5rem]"
                options={[
                  { value: "1 month", label: "1 month" },
                  { value: "2 month", label: "2 month" },
                ]}
                placeholder="Select product"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="product"
              >
                Name of service type
              </label>
              <Select
                className="!w-full !h-[2.5rem]"
                options={[
                  { value: "1 month", label: "1 month" },
                  { value: "2 month", label: "2 month" },
                ]}
                placeholder="Select service type"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <Input
                name="amount"
                id="amount"
                type="number"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                name="clientMail"
                required
                id="email"
                type="email"
                placeholder="your recipient address"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <PhoneInput
                country={"ng"}
                containerClass="!w-full"
                inputClass="phone-input-input !w-full"
              />
            </div>
            <RadioGroup
              id="tag"
              name="transactionCategory"
              options={options}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="!flex !justify-start !gap-[1rem]"
            />
            {(selectedOption === options[2].value ||
              selectedOption === options[1].value) && (
              <span className="flex flex-col gap-1">
                <label>Select Day</label>
                <span className="flex items-center justify-between gap-[2rem]">
                  <DatePicker picker="date" className="!w-full" />
                  <TimePicker
                    defaultValue={dayjs("12:08", "HH:mm")}
                    format={"HH:mm"}
                    className="!w-full "
                  />
                </span>
              </span>
            )}
            <div className="mt-4 space-y-3">
              <Button
                htmlType="submit"
                className="!h-[3rem] !bg-gray-200 w-full  text-white hover:!text-white"
              >
                Make Payment
              </Button>
              <Button className="!h-[3rem] w-full text-black hover:!text-black">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Electricity;
