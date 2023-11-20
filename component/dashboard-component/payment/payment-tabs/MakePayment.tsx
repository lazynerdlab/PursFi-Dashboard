"use client";
import {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
} from "react";
import {
  CustomSelect as Select,
  CustomInput as Input,
  CustomInputNumber as InputNumber,
  CustomText as Text,
  CustomRadioGroup as RadioGroup,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import {
  useGetBanksQuery,
  useVerifyAccountMutation,
  useSingleTransferMutation,
} from "@/services/disbursementService";
import { valueType } from "antd/es/statistic/utils";
import { useAppSelector } from "@/store/hooks";
import SuccessfulPaymentModal from "../modals/successfulPaymentModal";
const options = [
  { label: "instant payment", value: "instant_payment" },
  { label: "Schedule Payment", value: "schedule_payment" },
  { label: "Recurring payment", value: "recurring_payment" },
];
const amount: any = "";
const initialState = {
  amount: amount,
  bankName: "",
  narration: "",
  businessId: "",
  transactionCategory: "",
};
const initAcctDetails = {
  bankCode: "",
  accountNumber: "",
  currency: "NGN",
};
const MakePayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profile = useAppSelector((store) => store.user?.user);
  const [formdata, setFormdata] = useState(initialState);
  const { data, isLoading } = useGetBanksQuery({});
  const [verify, { isLoading: isVerifying }] = useVerifyAccountMutation();
  const [transfer, { isLoading: isProcessing }] = useSingleTransferMutation();
  const wallet = useAppSelector((store) => store.user.wallet);
  const [acctdetails, setAcctDetails] = useState(initAcctDetails);
  useEffect(() => {
    if (acctdetails.accountNumber.length === 10 && acctdetails.bankCode)
      verify(acctdetails)
        .unwrap()
        .then((res) => {
          setFormdata((prev) => ({ ...prev, bankName: res?.data?.data }));
        })
        .catch((err) => {
          console.log(err);
        });
  }, [acctdetails.accountNumber]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (formdata.bankName && formdata.transactionCategory)
      transfer({
        ...formdata,
        ...acctdetails,
        amount: formdata?.amount.toString(),
        businessId: profile?.businessId,
      })
        .unwrap()
        .then((res) => {
          setIsModalOpen(true);
          setAcctDetails(initAcctDetails);
          setFormdata(initialState);
        })
        .catch((err) => {
          console.log(err);
        });
    else {
    }
  };
  const onSearchChange = (value: string) => {
    setAcctDetails((prev) => ({ ...prev, bankCode: value }));
  };
  const onFormChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onAccountNumChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAcctDetails((prev) => ({ ...prev, accountNumber: e.target?.value }));
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 w-[80%] gap-[1rem] px-[3%]"
      >
        <span className="flex items-center justify-between gap-[2rem]">
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Bank Name</label>
            <Select
              showSearch
              placeholder="select bank"
              optionFilterProp="label"
              onChange={onSearchChange}
              id="bank"
              options={data}
            />
          </span>
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Account Number</label>
            <Input
              onChange={onAccountNumChange}
              maxLength={10}
              minLength={10}
              value={acctdetails.accountNumber}
              required
              type="number"
              className="!w-full"
              placeholder=""
            />
          </span>
        </span>
        <span className="flex flex-col">
          <label htmlFor="acct_name">Account Name</label>
          <Input value={formdata.bankName} disabled={true} id="acct_name" />
        </span>
        <span className="flex items-center justify-between gap-[2rem]">
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Select bank account to pay from</label>
            <Select
              id="bank"
              options={[{ label: wallet?.accountDetails?.accountName }]}
              value={wallet?.accountDetails?.accountName}
            />
          </span>
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Amount</label>
            <InputNumber
              name="amount"
              value={formdata.amount}
              onChange={(value: valueType | null) =>
                setFormdata((prev) => ({ ...prev, amount: value }))
              }
              className="!w-full"
              prefix="N"
              placeholder=""
              required
            />
          </span>
        </span>
        <span className="flex flex-col">
          <label htmlFor="memo">Payment Memo</label>
          <Text
            name="narration"
            value={formdata.narration}
            onChange={onFormChange}
            required
            id="memo"
          />
        </span>
        <span className="flex flex-col">
          <label htmlFor="tag">Payment Tag</label>
          <RadioGroup
            id="tag"
            name="transactionCategory"
            onChange={(e) =>
              setFormdata((prev) => ({
                ...prev,
                transactionCategory: e.target.value,
              }))
            }
            options={options}
            value={formdata.transactionCategory}
            className="!flex !justify-start !gap-[4rem]"
          />
        </span>
        <span className="flex flex-col">
          <label htmlFor="info">Addition Information(optional)</label>
          <Text id="info" />
          <span className="flex justify-between">
            <p>Maximum 500 characters</p>
            <p>0 / 500</p>
          </span>
        </span>
        <Button
          loading={isProcessing}
          htmlType="submit"
          className="!bg-black !h-[45px]"
          type="primary"
        >
          Send Payment
        </Button>
      </form>
      <SuccessfulPaymentModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
};

export default MakePayment;
