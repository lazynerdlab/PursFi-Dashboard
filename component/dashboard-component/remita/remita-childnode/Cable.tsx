"use client";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GrFormPreviousLink } from "react-icons/gr";
import {
  CustomInput as Input,
  CustomButton as Button,
  CustomSelect as Select,
  CustomDatePicker as DatePicker,
  CustomTimePicker as TimePicker,
  CustomInputNumber as InputNumber,
} from "@/lib/AntdComponents";
import "react-phone-input-2/lib/style.css";
import RemitaCable from "@/assets/icon/RemitaCable";
import { FormEventHandler, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import {
  useLazyGetBillersByCategoryQuery,
  useLazyGetBillerProductsQuery,
  useMakePaymentMutation,
  useValidateProductMutation,
} from "@/services/remitaService";
import { message } from "antd";
const currentDate = new Date();
const initialState = {
  amount: 0,
  product_id: "",
  product_name: "",
  biller_id: "",
  category_id: "",
  category_name: "",
  is_instant: true,
  is_scheduled: false,
  is_recurring: false,
  date: {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes(),
  },
  metadata: {
    customFields: [] as Record<string, any>[],
  },
};
const Cable = () => {
  const { back } = useRouter();
  const params = useSearchParams();
  const [makePayment, { isLoading: isPaying }] = useMakePaymentMutation();
  const [formdata, setFormdata] = useState(initialState);
  const [productFields, setProductFields] = useState<any[]>([]);
  const [logo, setLogo] = useState("");
  const [getBiller, { isLoading, data }] = useLazyGetBillersByCategoryQuery();
  const [getProduct, { isLoading: isLoadingProducts, data: products }] =
    useLazyGetBillerProductsQuery();
  const [validateProduct, { isLoading: isvalidating }] =
    useValidateProductMutation();
  useEffect(() => {
    if (params.get("id")) {
      getBiller({ categoryId: params.get("id") });
      setFormdata((prev) => ({
        ...prev,
        category_id: params.get("id") as string,
        category_name: params.get("name") as string,
      }));
    }
  }, [getBiller, params]);
  useEffect(() => {
    if (formdata?.biller_id) {
      getProduct({ billerId: formdata?.biller_id });
    }
  }, [formdata?.biller_id, getProduct]);

  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { label: "instant payment", value: "instant_payment" },
    { label: "Schedule Payment", value: "schedule_payment" },
    { label: "Recurring payment", value: "recurring_payment" },
  ];
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    makePayment({
      ...formdata,
      date: {
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString(),
        day: new Date().getDate().toString(),
        hour: new Date().getHours().toString(),
        minute: new Date().getMinutes().toString(),
      },
    })
      .unwrap()
      .then((res) => {
        message.success(res?.data?.message || "successful");
        back();
      })
      .catch((err) => {
        message.error(err?.data?.responseDescription || "an error occured");
      });
  };
  const validFields = productFields.filter((field) => field.validation);
  const validFieldValues = validFields.map((field) => {
    return formdata.metadata.customFields.find(
      (item) => item.variable_name === field.variableName
    )?.value;
  });
  const filteredValues = validFieldValues.filter(
    (value) => value !== undefined
  )[0];

  const handleVlaidate = () => {
    validateProduct({
      product_id: formdata.product_id,
      customer_id: filteredValues,
    })
      .unwrap()
      .then((res) => {
        if (res.data.valid) {
          message.success("product is valid");
        } else {
          message.error("product is not valid");
        }
      })
      .catch((err) => {
        message.error(err?.data?.responseDescription || "an error occured");
      });
  };

  return (
    <div className="mx-auto flex flex-col py-2 px-6 h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center my-6">
        <span>
          <span className="text-2xl font-medium flex gap-3 items-center mb-2">
            <GrFormPreviousLink className="cursor-pointer" onClick={back} />
            <h2 className="text-[18px] font-bold">{params.get("desc")}</h2>
          </span>
          <p className="text-[16px] text-gray-600">
            you can create one time payment, recurring or Schedule payment
          </p>
        </span>
        {/* <div className="flex items-center space-x-3">
          {" "}
          <button className="btn btn-md  bg-gray-200 hover:bg-gray-200 text-white text-sm normal-case">
            Make Payment
          </button>
          <button className="btn btn-md  border border-gray-400 bg-white hover:bg-white text-black text-sm normal-case">
            Cancel
          </button>
        </div> */}
      </header>
      <div className="grid grid-cols-[300px_500px] gap-[2rem] items-start px-[2em] mt-5">
        <div className="flex items-center gap-[0.5rem]">
          <span className="text-[12px] font-[400] text-white py[2%] px-[2%] rounded-full bg-black">
            1
          </span>
          <p className="text-inherit text[#181336] text-[16px] font-[600]">
            Select Provider
          </p>
        </div>
        <div className="flex flex-col space-y-4 w-full ">
          <span className="flex space-x-3">
            {logo ? (
              <Image width={50} height={50} alt="logo" src={logo} />
            ) : (
              <RemitaCable />
            )}
            <p className="text-[24px] font-bold">{params.get("name")}</p>
          </span>
          <form onSubmit={onSubmit} className="w-full space-y-4 mt-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="product"
              >
                Select Biller
              </label>
              <Select
                className="!w-full !h-[2.5rem]"
                options={data}
                disabled={isLoading}
                placeholder="Select biller"
                onChange={(value, obj: Record<string, any>) => {
                  setFormdata((prev) => ({
                    ...prev,
                    biller_id: value,
                    product_name: "",
                    product_id: "",
                  }));
                  setLogo(obj?.billerLogoUrl);
                }}
                showSearch
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="bouquet"
              >
                Select Product
              </label>
              <Select
                className="!w-full !h-[2.5rem]"
                options={products?.products}
                placeholder="Select product"
                showSearch
                value={formdata?.product_name}
                disabled={!formdata?.biller_id || products?.products.length < 1}
                onChange={(value, obj: Record<string, any>) => {
                  setProductFields(obj?.metadata?.customFields);
                  setFormdata((prev) => ({
                    ...prev,
                    product_id: obj?.billPaymentProductId as string,
                    product_name: obj?.billPaymentProductName as string,
                    metadata: {
                      customFields: obj?.metadata?.customFields.map(
                        (e: Record<string, any>) => ({
                          variable_name: e?.variableName,
                          value: "",
                        })
                      ),
                    },
                  }));
                }}
              />
            </div>
            {productFields.map((e, i) => (
              <div key={`${i}fields`}>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor={e?.variableName}
                >
                  {e?.displayName}
                </label>
                {e?.selectOptions.length > 1 ? (
                  <div className="flex items-center">
                    <Select
                      className="!w-full !h-[2.5rem]"
                      options={e?.selectOptions.map((e: any) => ({
                        value: e,
                        label: e,
                      }))}
                      onChange={(value) => {
                        setFormdata((prev) => ({
                          ...prev,
                          metadata: {
                            customFields: prev.metadata.customFields.map(
                              (item, i) => {
                                if (item.variable_name === e?.variableName)
                                  return { ...item, value: value };
                                else return item;
                              }
                            ),
                          },
                        }));
                      }}
                      onBlur={e?.required ? handleVlaidate : undefined}
                      placeholder={`select ${e?.variableName}`}
                    />
                    {isvalidating && (
                      <LoadingOutlined style={{ fontSize: 16 }} spin />
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Input
                      name={e?.variableName}
                      id={e?.variableName}
                      placeholder={`Enter ${e?.variableName}`}
                      required={e?.required}
                      value={
                        formdata?.metadata?.customFields.find(
                          (item) => item.variable_name === e?.variableName
                        )?.value
                      }
                      onChange={(j) => {
                        setFormdata((prev) => ({
                          ...prev,
                          metadata: {
                            customFields: prev.metadata.customFields.map(
                              (item, i) => {
                                if (item.variable_name === e?.variableName)
                                  return { ...item, value: j.target.value };
                                else return item;
                              }
                            ),
                          },
                        }));
                      }}
                      onBlur={e?.required ? handleVlaidate : undefined}
                    />
                    {isvalidating && (
                      <LoadingOutlined style={{ fontSize: 16 }} spin />
                    )}
                  </div>
                )}
              </div>
            ))}
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <InputNumber
                name="amount"
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="!w-full"
                value={formdata?.amount}
                onChange={(value) => {
                  setFormdata((prev) => ({ ...prev, amount: value as number }));
                }}
              />
            </div>
            {/* <div>
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
            </div> */}
            {/* <div>
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
            </div> */}

            {/* <RadioGroup
              id="tag"
              name="transactionCategory"
              options={options}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="!flex !justify-start !gap-[1rem]"
            /> */}
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
                className="!h-[3rem] !bg-black w-full !text-white hover:!text-white"
                loading={isPaying}
              >
                Make Payment
              </Button>
              <Button
                onClick={() => back()}
                className="!h-[3rem] w-full text-black hover:!text-black"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cable;
