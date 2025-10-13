import CustomTextInput from "@/app/component/ui/customTextInput";

export const PaymentDetailsForm = () => (
  <div className="pt-24">
    <p className="text-2xl font-semibold pb-3">Payment Details</p>
    <CustomTextInput
      label="Account Name"
      placeholder="Tang Chow Jerald Gan"
      variableName="accountName"
    />
    <CustomTextInput
      label="Account Number"
      placeholder="8310963274"
      variableName="accountNumber"
    />
    <CustomTextInput
      label="Account Type"
      placeholder="Checking"
      variableName="accountType"
    />
    <CustomTextInput
      label="Routing Number (US)"
      placeholder="026073150"
      variableName="routingNumber"
    />
    <CustomTextInput
      label="Swift/BIC (International)"
      placeholder="CMFGUS33"
      variableName="swiftCode"
    />
    <CustomTextInput
      label="Bank Name"
      placeholder="Community Federal Savings Bank"
      variableName="bankName"
    />
    <CustomTextInput
      label="Bank Address"
      placeholder="89-16 Jamaica Ave, Woodhaven, NY, 11421, United States"
      variableName="bankAddress"
    />
    <CustomTextInput
      label="Wise Email"
      placeholder="your-email@example.com"
      variableName="wiseEmail"
    />
    <CustomTextInput
      label="Wise Link"
      placeholder="https://wise.com/pay/your-link"
      variableName="wiseLink"
    />
  </div>
);
