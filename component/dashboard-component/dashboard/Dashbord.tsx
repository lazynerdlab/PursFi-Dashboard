"use client";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import React, { useEffect, useState } from "react";
import DashboardChart from "./DashboardChart";
import DashboardTable from "./DashboardTable";
import DashboardModal from "./DashboardModal";
import { useGetWalletQuery } from "@/services/walletService";
import { MdArrowOutward } from "react-icons/md";
import { FiArrowDownLeft } from "react-icons/fi";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { useGetWalletHistoryQuery } from "@/services/walletService";
import {
  useGetExpensesQuery,
  useGetTransactionStatusQuery,
} from "@/services/transactionService";
import Arrowleft from "@/assets/icon/Arrowleft";
import ArrowRight from "@/assets/icon/ArrowRight";
import { useLazyGetSecurityDetailsQuery } from "@/services/securityService";

const Dashbord = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetWalletQuery({});
  const { data: stats } = useGetWalletHistoryQuery({});
  const { data: analysis } = useGetExpensesQuery({});
  const { data: status } = useGetTransactionStatusQuery("");
 
  const wallet = useAppSelector((store) => store?.user?.wallet);
  
  const date = new Date();

 
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center ">
        <span>
          <h2 className="text-3xl font-bold mb-1"> Dashboard</h2>
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
            onClick={() => setIsModalOpen(true)}
            className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case"
          >
            + Add Fund
          </button>
          <Select
            className="!w-full !h-[2.7rem]"
            options={[
              { value: "1 month", label: "1 month" },
              { value: "2 month", label: "2 month" },
            ]}
            placeholder="Show stats Yearly"
          />
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-[2%] mt-8">
        <section className="flex flex-col space-y-8 ">
          <article className="flex flex-col md:flex-row items-start space-x-4 bg-white py-[1%] px-[2%]">
            <div className="flex flex-col gap-2 w-full">
              <div className="p-[20px] bg-black text-white w-full">
                <div className="flex items-center justify-between">
                  <p>Account Balance</p>
                  <Arrowleft />
                </div>
                <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(wallet?.walletBalance || 0).toLocaleString("en-US")}
                </p>
              </div>
              <div className="px-[20px] py-[10px] bg-black text-white w-full flex justify-between items-center text-[14px]">
                <p>Ledger Balance</p>
                <p className="text-[18px] font-semibold">
                  &#8358;
                  {Number(wallet?.ledgerBalance || 0).toLocaleString("en-US")}
                </p>
              </div>
            </div>
            <div className="bg-white p-[20px] text-black w-full border border-gray-300">
              <div className="flex items-center justify-between">
                <p>
                  Today, {date.toLocaleString("en-US", { month: "long" })}{" "}
                  {date.getFullYear()}
                </p>
                <ArrowRight />
              </div>
              <p className="text-2xl font-semibold">
                &#8358;
                {Number(analysis?.data?.todayBalance || 0).toLocaleString(
                  "en-US"
                )}
              </p>
            </div>
          </article>
          <div className="my-4 bg-white py-[1%] px-[3%]">
            <DashboardChart data={stats || []} />
          </div>
          <DashboardTable />
        </section>
        <section className="flex flex-col space-y-8">
          <div className="space-y-2 bg-white p-[2%]">
            <p className="text-xl font-semibold">Payment that need Attention</p>
            <div className="grid grid-cols-2 gap-5">
              <span className="bg-[#FAFAFA] p-2">
                <p className="text-gray-500 text-sm">Today payments</p>
                <p className="text-xl font-semibold">
                  {status?.data?.todayPayment}
                </p>
              </span>
              <span className="bg-[#FAFAFA] p-2">
                <p className="text-gray-500 text-sm">Older payments</p>
                <p className="text-xl font-semibold">
                  {wallet?.transactionCount}
                </p>
              </span>
            </div>
            <Link href="/payment" className="text-gray-500 text-sm underline">
              Respond to Payments{" "}
            </Link>
          </div>
          <div className="p-3 bg-white space-y-6 ">
            {" "}
            <div className="bg-white p-[2%] border-b border-b-gray-400 ">
              <span className="flex justify-between">
                <p className="text-xl font-semibold">
                  Upcoming Payment this week
                </p>
                <p className="text-gray-400">Total amount </p>
              </span>
              <span className="flex justify-between">
                <p className="text-2xl font-semibold">
                  {status?.data?.upcomingPaymentCount}
                </p>
                <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(
                    status?.data?.totalUpcomingPayment || 0
                  ).toLocaleString("en-US")}
                </p>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex space-x-3">
                <p>Schedule Payment</p>
                <p>{status?.data?.schedulePaymentLength}</p>
              </span>
              <Link href="/payment?activeKey=2" className="underline">
                View
              </Link>
            </div>
            <div className="flex justify-between items-center ">
              <span className="flex space-x-3">
                <p>Recurring Payment</p>
                <p>{status?.data?.recurringPaymentLength}</p>
              </span>
              <Link href="/payment?activeKey=3" className="underline">
                View
              </Link>
            </div>
            <Link href="/payment" className="text-gray-500 text-sm underline">
              View upcoming payment
            </Link>
          </div>

          <div className="space-y-3 p-2 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <span className="flex items-center space-x-3">
                  {" "}
                  <MdArrowOutward size={20} className="text-[#31CFD5]" />
                  <p>Daily Cash Inflow</p>
                </span>
                <p className="text-xl font-semibold">
                  &#8358;
                  {Number(status?.data?.cashInflow || 0).toLocaleString(
                    "en-US"
                  )}
                </p>
              </div>
              {/* <Select
                style={{ width: "50%" }}
                options={[
                  { value: "2 months", label: "2 months" },
                  { value: "3 months", label: "3 months" },
                  { value: "4-5 months", label: "4-5 months" },
                ]}
                placeholder="1 Months"
              />{" "} */}
            </div>
            <p className="text-gray-400 text-sm text-center">
              you can check where your money come and go here
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-gray-300  rounded-md space-y-1">
                <div className="bg-[#31CFD5] h-3 w-3 rounded-full" />
                <p>Invoice</p>
                <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(status?.data?.invoice || 0).toLocaleString("en-US")}
                </p>
              </div>
              <div className="p-3 border border-gray-300  rounded-md space-y-1">
                <div className="bg-[#31CFD5] h-3 w-3 rounded-full" />
                <p>Others</p>
                <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(status?.data?.otherCollection || 0).toLocaleString(
                    "en-US"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3 p-2 bg-white">
            <div className="flex justify-between items-center">
              <div>
                <span className="flex items-center space-x-3">
                  <FiArrowDownLeft size={20} className="text-red-500" />
                  <p>Daily Cash Outflow</p>
                </span>
                <p className="text-xl font-semibold">
                  &#8358;
                  {Number(status?.data?.cashOutflow || 0).toLocaleString(
                    "en-US"
                  )}
                </p>
              </div>
              {/* <Select
                style={{ width: "50%" }}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                ]}
                placeholder="1 Months"
              />{" "} */}
            </div>
            <p className="text-gray-400 text-sm text-center">
              you can check where your money come and go here
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-gray-300  rounded-md space-y-1">
                <div className="bg-red-500 h-3 w-3 rounded-full" />
                <p>Payroll</p>
                <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(status?.data?.payroll || 0).toLocaleString("en-US")}
                </p>
              </div>
              <div className="p-3 border border-gray-300  rounded-md space-y-1">
                <div className="bg-red-500 h-3 w-3 rounded-full" />
                <p>Payment</p>
                <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(status?.data?.otherDisbursment || 0).toLocaleString(
                    "en-US"
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
        <DashboardModal open={isModalOpen} setOpen={setIsModalOpen} />
      </main>
    </div>
  );
};

export default Dashbord;
