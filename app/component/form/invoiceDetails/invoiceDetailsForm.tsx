"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CurrencyInput from "@/app/component/ui/currencyInput";
import { currencyList } from "@/lib/currency";
import { Input } from "@/app/component/ui/input";
import { Plus, Trash2, RefreshCw } from "lucide-react";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import { useGetValue } from "@/app/hooks/useGetValue";
import { Controller } from "react-hook-form";
import { getItemValue } from "@/lib/getInitialValue";

export const InvoiceDetailsForm = () => {
  const value = useGetValue("currency", "AUD");
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === value.toLowerCase()
  )?.details;

  const reprocessItemsWithNewRate = () => {
    const hourlyRateStr = localStorage.getItem("hourlyRate");
    const newHourlyRate = hourlyRateStr ? parseFloat(hourlyRateStr) : 60;

    // Get current items
    const currentItems = JSON.parse(localStorage.getItem("items") || "[]");

    // Check if items look like they were imported from CSV (have date in description)
    const csvItems = currentItems.filter((item: Item) =>
      item.itemDescription &&
      item.itemDescription.includes('\n') &&
      /^\d{4}-\d{2}-\d{2}/.test(item.itemDescription.split('\n')[0])
    );

    if (csvItems.length === 0) {
      alert("No CSV-imported items found to reprocess. Only items imported from CSV can be automatically updated.");
      return;
    }

    // Reprocess CSV items with new hourly rate
    const updatedItems = currentItems.map((item: Item) => {
      // Check if this is a CSV item (has date format at start)
      if (item.itemDescription && /^\d{4}-\d{2}-\d{2}/.test(item.itemDescription.split('\n')[0])) {
        return {
          ...item,
          amount: newHourlyRate * (item.qty || 1)
        };
      }
      return item; // Leave manually added items unchanged
    });

    // Save updated items
    localStorage.setItem("items", JSON.stringify(updatedItems));

    // Trigger a re-render by updating the form value
    const event = new Event('storage');
    window.dispatchEvent(event);

    alert(`Updated ${csvItems.length} item(s) with new hourly rate of ${currencyDetails?.currencySymbol || '$'}${newHourlyRate}`);
  };

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div className="pt-24">
          <p className="text-2xl font-semibold pb-3">Invoice Details</p>
          <div className="flex flex-col gap-6">
            <div>
              <p className="pt-3 font-medium text-neutral-500">
                Select an invoice currency
              </p>
              <CurrencyInput />
            </div>
            <div>
              <p className="py-3 font-medium text-sm text-neutral-500">Items</p>
              {value.map(
                ({ itemDescription, amount, qty }: Item, index: number) => (
                  <div
                    className="flex relative items-center group -ml-8"
                    key={index}
                  >
                    <div
                      className={`w-9 h-7 ${value.length === 1 && "invisible"}`}
                    >
                      <button
                        onClick={() => {
                          const newList = [...value];
                          newList.splice(index, 1);
                          localStorage.setItem(
                            "items",
                            JSON.stringify(newList)
                          );
                          onChange(newList);
                        }}
                        type="button"
                        className="flex-shrink-0 rounded-md p-1.5 group-hover:bg-gray-50 hidden group-hover:block"
                      >
                        <Trash2 className="w-4 text-gray-500 h-4 group-hover:text-red-400" />
                      </button>
                    </div>
                    <div className="w-full flex-1">
                      <Input
                        placeholder="Item name"
                        value={itemDescription}
                        type="text"
                        onChange={(e) => {
                          const updatedArray = [...value];
                          updatedArray[index] = {
                            itemDescription: e.target.value,
                            amount,
                            qty,
                          };
                          localStorage.setItem(
                            "items",
                            JSON.stringify(updatedArray)
                          );
                          onChange(updatedArray);
                        }}
                      />
                    </div>
                    <div className="w-14">
                      <Input
                        placeholder="Qat"
                        value={`${qty || ""}`}
                        type="text"
                        pattern="[0-9]*"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            /^-?\d*\.?\d*$/.test(inputValue) ||
                            inputValue === ""
                          ) {
                            const updatedArray = [...value];
                            updatedArray[index] = {
                              itemDescription,
                              amount,
                              qty: +inputValue,
                            };
                            localStorage.setItem(
                              "items",
                              JSON.stringify(updatedArray)
                            );
                            onChange(updatedArray);
                          }
                        }}
                      />
                    </div>
                    <div className="w-14">
                      <Input
                        placeholder="Price"
                        value={`${amount || ""}`}
                        type="text"
                        pattern="[0-9]*"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            /^-?\d*\.?\d*$/.test(inputValue) ||
                            inputValue === ""
                          ) {
                            const updatedArray = [...value];
                            updatedArray[index] = {
                              itemDescription,
                              amount: +inputValue,
                              qty,
                            };
                            localStorage.setItem(
                              "items",
                              JSON.stringify(updatedArray)
                            );
                            onChange(updatedArray);
                          }
                        }}
                      />
                    </div>
                  </div>
                )
              )}
              <div className="py-3 border-dashed border-b border-gray-300">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "items",
                      JSON.stringify([...value, { itemDescription: "" }])
                    );
                    onChange([...value, { itemDescription: "" }]);
                  }}
                  type="button"
                  className="flex justify-center items-center text-orange-500 font-medium text-sm gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <p>Add Item</p>
                </button>
              </div>
            </div>
            <div>
              <p className="pt-3 font-medium text-sm text-neutral-500 pb-5">
                Note
              </p>
              <CustomTextInput placeholder="Add a note" variableName="note" />
            </div>
            <div>
              <p className="pt-3 font-medium text-sm text-neutral-500 pb-5">
                More options
              </p>
              <CustomNumberInput
                label="Discount"
                placeholder={`${currencyDetails?.currencySymbol}0`}
                variableName="discount"
              />
              <CustomNumberInput
                label="GST"
                placeholder="10%"
                variableName="tax"
              />
              <div className="flex items-center gap-2">
                <CustomNumberInput
                  label="Hourly Rate"
                  placeholder={`${currencyDetails?.currencySymbol}60`}
                  variableName="hourlyRate"
                />
                <button
                  type="button"
                  onClick={reprocessItemsWithNewRate}
                  className="mt-8 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md border border-blue-200 flex items-center gap-2 text-sm"
                  title="Apply new hourly rate to existing CSV items"
                >
                  <RefreshCw className="w-4 h-4" />
                  Apply to Items
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      name="items"
      defaultValue={getItemValue()}
    />
  );
};
