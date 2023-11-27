"use client";
import { useEffect, useState } from "react";
import {
  CustomTable as Table,
  CustomDatePicker as DatePicker,
  CustomInput as Input,
} from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import FilterIcon from "@/assets/icon/FilterIcon";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Dropdown, Menu, MenuProps } from "antd";
import AccountDrawal from "./AccountDrawal";
import { useTransactionsMutation } from "@/services/transactionService";
import { useAppSelector } from "@/store/hooks";

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
const initialState = {
  userId: "",
  businessId: "",
  startDate: "",
  filterBy: "",
  endDate: "",
  amount: "",
  page: 1,
  perPage: 5,
};

const AccountTable = () => {
  const [fetchTransactions, { isLoading }] = useTransactionsMutation();
  const profile = useAppSelector((store) => store.user.user);
  const [data, setData] = useState<DataType[]>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [filter, setFilter] = useState(false);
  const [tableFilter, setTableFilter] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<DataType | null>(null);
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Date</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "date",
      render: (date) => `${date}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Full Name</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "name",
      render: (name) => `${name}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Purpose</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "purpose",
      render: (purpose) => `${purpose}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>type</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "type",
      render: (type) =>
        type === "Debit" ? (
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
      dataIndex: "id",
      render: (_: any, record: DataType) => {
        const menu: React.ReactElement<MenuProps> = (
          <Menu>
            <Menu.Item
              key="show-details"
              onClick={() => {
                setSelectedAccount(record);
                setOpen(true);
              }}
            >
              View transaction{" "}
            </Menu.Item>
            <Menu.Item key="download-receipt">Download Receipt</Menu.Item>
            <Menu.Item key="report-transaction">Report Transaction</Menu.Item>
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
  // const fetchData = () => {
  //   setLoading(true);
  //   fetch(`https://testapi.io/api/sikiru/purscliq-transaction`)
  //     .then((res) => res.json())
  //     .then((results) => {
  //       setData(results);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams?.pagination,
  //           total: 200,
  //         },
  //       });
  //     });
  // };

  useEffect(() => {
    fetchTransactions({
      ...tableFilter,
      page: tableParams?.pagination?.current,
      userId: profile?.id,
      businessId: profile?.businessId,
    })
      .unwrap()
      .then((res) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams?.pagination,
            total: res.total,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [JSON.stringify(tableParams), filter]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
    }));
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className="bg-white flex flex-col gap-[0.5rem] p-[2%]">
      <h4 className=" text-[19px] font-[600]">Transaction</h4>
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <DatePicker
          onChange={(_, date) =>
            setTableFilter((prev) => ({
              ...prev,
              startDate: date,
            }))
          }
          className="h-fit w-fit"
          placeholder="Start Date"
        />
        <DatePicker
          onChange={(_, date) =>
            setTableFilter((prev) => ({
              ...prev,
              amount: date,
            }))
          }
          className="h-fit w-fit"
          placeholder="End Date"
        />
        <div className="w-fit">
          <Input
            value={tableFilter?.amount}
            onChange={(e) =>
              setTableFilter((prev) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
            className="h-fit w-fit"
            placeholder="Amount"
          />
        </div>
        <div
          onClick={() => {
            setFilter((prev) => !prev);
          }}
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
          dataSource={data}
          pagination={tableParams.pagination}
          loading={isLoading}
          onChange={handleTableChange}
        />
      </div>
      <AccountDrawal
        Open={open}
        onClose={() => setOpen(false)}
        account={selectedAccount}
      />
    </div>
  );
};

export default AccountTable;
