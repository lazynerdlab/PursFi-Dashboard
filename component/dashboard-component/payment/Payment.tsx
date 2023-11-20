"use client";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import PaymentTabs from "./PaymentTabs";
import { useRouter } from "next/navigation";

const Payment = () => {
  const date = new Date();
  const { push } = useRouter();
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center my-6">
        <span>
          <h2 className="text-2xl font-medium"> Payment</h2>
          <p className="text-sm text-gray-600">
            Showing your Account metrics for{" "}
            {date.toLocaleString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </span>
        <div className="flex justify-center items-center space-x-5">
          <button
            onClick={() => push("payment/create")}
            className="btn btn-md bg-black hover:bg-black text-white text-sm normal-case"
          >
            + Create payment
          </button>
          <Select
            className="!w-full"
            options={[
              { value: "1 month", label: "1 month" },
              { value: "2 month", label: "2 month" },
            ]}
            placeholder="Show stats Yearly"
          />
        </div>
      </header>
      <main className="grid grid-cols-1 gap-[2%]">
        <PaymentTabs />
      </main>
    </div>
  );
};

export default Payment;
