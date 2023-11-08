import React from "react";

const CreatePayment = () => {
  return (
    <div className="mx-auto flex flex-col py-2 px-6 h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center my-6">
        <span>
          <h2 className="text-2xl font-medium">Make Payment</h2>
          <p className="text-sm text-gray-600">
            you can create one time payment, recurring or Schedule payment
          </p>
        </span>
        {/* <div className="flex justify-center items-center space-x-5">
      <button className="btn btn-md bg-black hover:bg-black text-white text-sm normal-case">
        + Create payment
      </button>
      <Select
        className="!w-full"
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
        ]}
        placeholder="Show stats Yearly"
      />
    </div> */}
      </header>
      <main className="grid grid-cols-1 gap-[2%]"></main>
    </div>
  );
};

export default CreatePayment;
