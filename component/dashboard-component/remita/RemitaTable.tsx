"use client";
import { useEffect, useState } from "react";
import {
  CustomTable as Table,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import FilterIcon from "@/assets/icon/FilterIcon";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Dropdown, Menu, MenuProps } from "antd";
import { useTransactionsMutation } from "@/services/transactionService";
import { useAppSelector } from "@/store/hooks";
import RemitaDrawal from "./RemitaDrawal";

export interface DataType {
  name: string;
  date: string;
  purpose: string;
  type: string;
  amount: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
}

const RemitaTable = () => {
  //   const [fetchTransactions, { isLoading, data }] = useTransactionsMutation();
  //   const profile = useAppSelector((store) => store.user.user);
  //   // const [data, setData] = useState<DataType[]>();
  //   const [tableParams, setTableParams] = useState<TableParams>({
  //     pagination: {
  //       current: 1,
  //       pageSize: 5,
  //     },
  //   });
  //   const [id, setId] = useState("");
  //   const [filter, setFilter] = useState(false);
  //   const [open, setOpen] = useState(false);
  //   const [selectedAccount, setSelectedAccount] = useState<DataType | null>(null);
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Date</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "createdAt",
      render: (date) =>
        `${new Date(date).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Type of Service</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "accountName",
      render: (name) => `${name}`,
      width: "30%",
    },

    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Product</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "transactionType",
      render: (type) =>
        type === "debit" ? (
          <span className="p-[4%] rounded-[80px] bg-[#FF39561A]/[10%] text-[#FF3956] text-center  text-[14px] font-[600]">
            {type}
          </span>
        ) : (
          <span className="p-[4%] rounded-[80px] bg-[#0AA07B]/[10%] text-[#0AA07B] text-center text-[14px] font-[600]">
            {type}
          </span>
        ),
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase">
          <p>Status</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "amount",
      render: (amount) => `${amount}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase">
          <p>Amount</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "amount",
      render: (amount) => `${amount}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "reference",
      render: (id: any, record: DataType) => {
        return (
          <span
            // onClick={() => {
            //   setId(id);
            //   setOpen(true);
            // }}
            className="cursor-pointer"
          >
            ...
          </span>
        );
      },
    },
  ];

  //   useEffect(() => {
  //     fetchTransactions({
  //       ...tableFilter,
  //       page: tableParams?.pagination?.current,
  //       userId: profile?.id,
  //       businessId: profile?.businessId,
  //     })
  //       .unwrap()
  //       .then((res) => {
  //         setTableParams({
  //           ...tableParams,
  //           pagination: {
  //             ...tableParams?.pagination,
  //             total: res?.data.total,
  //           },
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [JSON.stringify(tableParams)]);
  //   useEffect(() => {
  //     fetchTransactions({
  //       ...tableFilter,
  //       page: 1,
  //       userId: profile?.id,
  //       businessId: profile?.businessId,
  //     })
  //       .unwrap()
  //       .then((res) => {
  //         setTableParams({
  //           ...tableParams,
  //           pagination: {
  //             ...tableParams?.pagination,
  //             total: res?.data.total,
  //           },
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [JSON.stringify(filter)]);

  //   const handleTableChange = (pagination: TablePaginationConfig) => {
  //     setTableParams((prev) => ({
  //       ...prev,
  //       pagination,
  //     }));
  //     // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
  //     //   setData([]);
  //     // }
  //   };

  return (
    <div className="bg-white flex flex-col gap-[1rem] p-[2%]">
      <h4 className=" text-[19px] font-[600]">Transaction</h4>
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <div className="flex space-x-3 items-center w-[30%] ">
          <Select
            className="!w-full !h-[2.5rem]"
            options={[
              { value: "Buy Electricity", label: "Buy Electricity" },
              { value: "Buy Cable", label: "Buy Cable" },
              { value: "Pay Tax", label: "Pay Tax" },
              { value: "Buy WAEC", label: "Buy WAEC" },
              { value: "Pay Water", label: "Pay Water" },
              { value: "Pay TSA", label: "Pay TSA" },
            ]}
            placeholder="Service"
          />
          <Select
            className="!w-full !h-[2.5rem]"
            options={[
              { value: "Successful", label: "Successful" },
              { value: "Failed", label: "Failed" },
              { value: "Awaiting", label: "Awaiting" },
            ]}
            placeholder="Status"
          />
        </div>
        <div
          //   onClick={() => {
          //     setFilter((prev) => !prev);
          //   }}
          className="flex justify-end w-full cursor-pointer"
        >
          <span className="flex items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </span>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-[22rem] md:w-full">
        <Table
          columns={columns}
          dataSource={[]}
          //   loading={isLoading}
        />
      </div>
      {/* <RemitaDrawal Open={open} onClose={() => setOpen(false)} id={id} /> */}
    </div>
  );
};

export default RemitaTable;