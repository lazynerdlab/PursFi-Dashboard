import FilterIcon from "@/assets/icon/FilterIcon";
import TableIcon from "@/assets/icon/TableIcon";
import {
  CustomTable as Table,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import { Dropdown, Menu, MenuProps, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { BsSquare } from "react-icons/bs";
import DeatilsDrawe from "../DetailsDrawe";
import { useRouter } from "next/navigation";
interface EmployeeData {
  key: string;
  firstName: string;
  gross: string;
  deduction: string;
  amount: string;
  status: string;
}
const data: EmployeeData[] = [
  {
    key: "1",
    firstName: "John",
    gross: "₦2000",
    deduction: "₦500",
    amount: "₦1500",
    status: "paid",
  },
  {
    key: "2",
    firstName: "Alice",
    gross: "₦2500",
    deduction: "₦600",
    amount: "₦1900",
    status: "unpaid",
  },
  {
    key: "3",
    firstName: "Bob",
    gross: "₦1800",
    deduction: "₦400",
    amount: "₦1400",
    status: "unpaid",
  },
  {
    key: "4",
    firstName: "Emma",
    gross: "₦3000",
    deduction: "₦700",
    amount: "₦2300",
    status: "paid",
  },
  {
    key: "5",
    firstName: "Michael",
    gross: "₦2200",
    deduction: "₦300",
    amount: "₦1900",
    status: "unpaid",
  },
  {
    key: "6",
    firstName: "Sophia",
    gross: "₦2700",
    deduction: "₦550",
    amount: "₦2150",
    status: "paid",
  },
];

const Contractor = ({
  data,
  isLoading,
  id,
}: {
  data: any;
  isLoading: boolean;
  id: string;
}) => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [benId, setBenId] = useState("");
  const columns: ColumnsType<EmployeeData> = [
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>First Name</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Bank</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "bankName",
      key: "gross",
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Job Role</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "jobRole",
      key: "deduction",
      render: (name) => <p className="capitalize">{name}</p>,
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Amount</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "salary",
      key: "amount",
      render: (amount: string) => (
        <p>&#8358;{Number(amount || 0).toLocaleString()}</p>
      ),
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Status</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p
          className={`p-1 rounded-md w-fit text-sm capitalize ${
            status === "active" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {status}
        </p>
      ),
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "id",
      render: (id) => {
        const menu: React.ReactElement<MenuProps> = (
          <Menu>
            <Menu.Item
              key="show-details"
              onClick={() => {
                setBenId(id);
                setOpen(true);
              }}
            >
              View details{" "}
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <span className="cursor-pointer">...</span>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <div className="w-full mt-2 p-3 flex flex-col space-y-3">
      <p>Member</p>
      <div className="flex items-center justify-between w-full">
        <Select placeholder="Status" id="select" className="!w-[10rem]" />
        <div className="flex justify-end w-full cursor-pointer space-x-5">
          <button
            onClick={() => push(`/add-member?type=contractor&id=${id}`)}
            className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case"
          >
            + Add Single Member
          </button>
          <button
            onClick={() => push(`/add-member/many?id=${id}`)}
            className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case"
          >
            + Add Multiple Member
          </button>
          <span className="flex items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </span>
        </div>
      </div>
      <Table columns={columns} dataSource={data} loading={isLoading} />
      <DeatilsDrawe
        benId={benId}
        id={id}
        Open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Contractor;