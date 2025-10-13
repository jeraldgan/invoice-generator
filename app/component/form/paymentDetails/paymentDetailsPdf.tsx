import { pdfTypography, pdfUtils } from "@/lib/pdfStyles";
import { Text, View } from "@react-pdf/renderer";
import React from "react";

interface PaymentDetailsPdfProps extends PaymentDetails {
  countryImageUrl: string;
}

export const PaymentDetailsPdf: React.FC<PaymentDetailsPdfProps> = ({
  bankName,
  accountNumber,
  accountName,
  accountType,
  routingCode,
  swiftCode,
  ifscCode,
  bankAddress,
  wiseEmail,
  wiseLink,
  currency = "INR",
  countryImageUrl,
}) => {

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingLeft: 40,
          paddingRight: 12,
          paddingVertical: 16,
          flexDirection: "column",
        }}
      >
        <Text style={{ paddingBottom: 12, ...pdfTypography.title }}>
          Bank Details
        </Text>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <View style={pdfUtils.flexRowItemCenter}>
            <Text style={pdfTypography.paymentTitle}>Account Name</Text>
            <Text
              style={{
                flex: 1,
                ...pdfTypography.itemDescription,
                paddingLeft: 26,
              }}
            >
              {accountName ? accountName : "-"}
            </Text>
          </View>
          <View style={pdfUtils.flexRowItemCenter}>
            <Text style={pdfTypography.paymentTitle}>Account Number</Text>
            <Text
              style={{
                flex: 1,
                ...pdfTypography.itemDescription,
                paddingLeft: 14,
              }}
            >
              {accountNumber ? accountNumber : "-"}
            </Text>
          </View>
          {accountType ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>Account Type</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 32,
                }}
              >
                {accountType}
              </Text>
            </View>
          ) : undefined}
          <View style={pdfUtils.flexRowItemCenter}>
            <Text style={pdfTypography.paymentTitle}>Bank Name</Text>
            <Text
              style={{
                flex: 1,
                ...pdfTypography.itemDescription,
                paddingLeft: 44.5,
              }}
            >
              {bankName ? bankName : "-"}
            </Text>
          </View>
          {bankAddress ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>Bank Address</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 28,
                }}
              >
                {bankAddress}
              </Text>
            </View>
          ) : undefined}
          {routingCode ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>Routing Number</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 28,
                }}
              >
                {routingCode}
              </Text>
            </View>
          ) : undefined}
          {swiftCode ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>Swift/BIC</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 52,
                }}
              >
                {swiftCode}
              </Text>
            </View>
          ) : undefined}
          {ifscCode ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>IFSC Code</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 48,
                }}
              >
                {ifscCode}
              </Text>
            </View>
          ) : undefined}
          {wiseEmail ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>Wise Email</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 44,
                }}
              >
                {wiseEmail}
              </Text>
            </View>
          ) : undefined}
          {wiseLink ? (
            <View style={pdfUtils.flexRowItemCenter}>
              <Text style={pdfTypography.paymentTitle}>Wise Link</Text>
              <Text
                style={{
                  flex: 1,
                  ...pdfTypography.itemDescription,
                  paddingLeft: 48,
                }}
              >
                {wiseLink}
              </Text>
            </View>
          ) : undefined}
        </View>
      </View>
      {/* <View
        style={{
          flex: 1,
          paddingLeft: 40,
          paddingRight: 12,
          paddingVertical: 16,
          flexDirection: "column",
        }}
      >
        <Text style={{ ...pdfTypography.title, paddingBottom: 12 }}>
          Payable in
        </Text>
        {currencyDetails && (
          <View style={{ ...pdfUtils.flexRowItemCenter, gap: 8 }}>
            <Image
              src={countryImageUrl}
              style={{
                width: 30,
                height: 30,
                flexShrink: 0,
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
            <View>
              <Text style={{ fontSize: 14, fontWeight: "medium" }}>
                {currencyDetails.currencyName}
              </Text>
              <Text style={pdfTypography.title}>
                {currencyDetails.currencySymbol}{" "}
                {currencyDetails.currencyShortForm}
              </Text>
            </View>
          </View>
        )}
      </View> */}
    </View>
  );
};
