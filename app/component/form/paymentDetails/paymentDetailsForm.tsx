import CustomTextInput from "@/app/component/ui/customTextInput";

export const PaymentDetailsForm = () => (
  <div className="pt-24">
    <p className="text-2xl font-semibold pb-3">Payment Details</p>
    <CustomTextInput
      label="Bank Name"
      placeholder="Commonwealth Bank"
      variableName="bankName"
    />
    <CustomTextInput
      label="Account Name"
      placeholder="John Smith"
      variableName="accountName"
    />
    <CustomTextInput
      label="Account Number"
      placeholder="1234 5678"
      variableName="accountNumber"
    />
    <CustomTextInput
      label="BSB Number"
      placeholder="062-000"
      variableName="bsbNumber"
    />
  </div>
);
