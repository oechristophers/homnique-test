import React from "react";

const Invoice = () => {
  const adminCharges = 0.10; // Flat admin charge
  const vatRate = 0.075; // VAT rate: 15%

  // Example invoice items
  const items = [
    { description: "HEAV60", subDesc: "heavy duty socket spanner", quantity: 1, unitPrice: 127660 },
  ];

  // Calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );
  const vat = subtotal * vatRate;
  const adminCharge = subtotal * adminCharges;
  const total = subtotal + adminCharge + vat;

  return (
    <div className="py-6 bg-gray-100 flex flex-col items-center text-black min-h-screen">
      <div className="max-w-6xl bg-white border-2 py-6 pb-0 pt-0 shadow-md rounded-md">
        {/* Top Header */}
        <div className="flex justify-between items-center  bg-gray-700 pr-3 border-b-2 ">
          <h1 className="text-2xl ml-4 text-white font-bold ">
            Vendor Invoicing
          </h1>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white  rounded px-3 py-1 shadow hover:bg-blue-600">
              Print
            </button>
            <button className="bg-red-500 text-white  rounded px-3 py-1 shadow hover:bg-red-600">
              Delete
            </button>
            <button className="bg-green-500 text-white  rounded px-3 py-1 shadow hover:bg-green-600">
              Create Invoice
            </button>
          </div>
        </div>

        {/* Vendor and Invoice Info */}
        <div className="flex justify-between py-3 text-white bg-gray-500 mb-6 px-6">
          {/* Left: Vendor Info */}
          <div className="w-1/2 space-y-2">
            <p className="text-white text-[1.1rem] font-semibold">EBUNDA GLOBAL</p>
            <p className="text-white ">Clitter house layout<br />Off East West road
            <br />Port harcourt, Rivers
            </p>
          </div>

          {/* Right: Invoice Info */}
          <div className="w-1/2 flex gap-2 flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <label className="font-semibold w-[130px]">Date:</label>
              <input
                type="text"
                value="December 31, 2024"
                className="bg-white text-black  pl-1 focus:outline-none flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-semibold w-[130px]">Invoice No:</label>
              <input
                type="text"
                value="00005"
                className="bg-white text-black pl-1 focus:outline-none flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-semibold w-[130px]">Vendor Code:</label>
              <input
                type="text"
                value="---"
                className="bg-white text-black pl-1 focus:outline-none flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-semibold w-[130px]">TIN No:</label>
              <input
                type="text"
                value={"2401110044813"}
                className="bg-white text-black pl-1 focus:outline-none flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-semibold w-[130px]">Vendor PO No:</label>
              <input
                type="text"
                value="01468"
                className="bg-white text-black pl-1 focus:outline-none flex-1"
              />
            </div>
          </div>
        </div>

        <div className="px-6">
          {/* Table */}
          <table className="w-full   border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-300 px-4 py-2 text-center">
                  S/N
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Rate (₦)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Amount (₦)
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-gray-500 ">
                <td className="py-4"></td>
                <td className="py-4"></td>
                <td className="py-4"></td>
                <td className="py-4"></td>
                <td className="py-4"></td>
              </tr>
              {items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.description}
                    <p className="text-[#0000008e] max-w-[14ch] uppercase text-[.9rem]">
                      {item.subDesc}
                    </p>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.quantity} SET
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {item.unitPrice.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    {(item.quantity * item.unitPrice).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-right font-semibold"
                >
                  Subtotal
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {subtotal.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-right font-semibold"
                >
                  Service Charge (10%)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {adminCharge.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-right font-semibold"
                >
                  VAT (7.5%)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {vat.toLocaleString()}
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-right font-bold"
                >
                  Total (VAT Inc.)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right font-bold">
              {Math.trunc(total).toLocaleString()}

                </td>
              </tr>
            </tfoot>
          </table>

          {/* Footer */}
          <div className="mt-8 flex justify-between mb-4">
            <div className="text-sm">
              <p className="font-semibold w-[16rem] bg-gray-700 text-white pl-2">
                Vendor Business Account Details:
              </p>
              <p className="pl-4">Account Name: Ebunda Global</p>
              <p className="pl-4">Account Number: 1027033057 </p>
              <p className="pl-4">Bank Name: United Bank of Africa (UBA)</p>
              <p className="pl-4">Bank Branch: Vendor Branch</p>
             <p className="pl-4">
                Sort Code: -- -- --{" "}
                <span className="italic">(for Foreign Vendors only)</span>{" "}
              </p>
              <p className="pl-4">
                SWIFT Code: -- -- --{" "}
                <span className="italic">(for Foreign Vendors only)</span>{" "}
              </p>
            </div>

            <p className="text-sm text-transparent">
              Thank you for your business! Please make payment by the due date.
            </p>
          </div>
        </div>
        <div className="bg-gray-700">
          <p className="text-white text-center py-2 border-t-2  ">
            Registered Company Number (RC) or Business Number (BN)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
