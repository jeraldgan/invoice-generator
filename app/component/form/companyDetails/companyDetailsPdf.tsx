/* eslint-disable jsx-a11y/alt-text */
"use client";
import { pdfContainers, pdfTypography } from "@/lib/pdfStyles";
import { Text, View } from "@react-pdf/renderer";
import React from "react";

export const CompanyDetailsPdf: React.FC<CompanyDetails> = ({
  email,
  companyName,
  companyAddress,
  companyCity,
  companyState,
  companyCountry,
  companyLogo,
  companyTaxId,
  companyZip,
}) => {
  const formattedLocation = [companyCity, companyState]
    .filter(Boolean)
    .join(", ");
  const formattedEmails = email
    ?.split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .join(",\n");
  const formattedCompanyTaxId = companyTaxId
    ?.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, "")
    .replace(/,/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <View style={pdfContainers.CompanyDetails}>
      <Text style={{ ...pdfTypography.title, marginBottom: 14 }}>To</Text>
      {companyName && (
        <Text style={{ ...pdfTypography.text2xl, flexWrap: "wrap" }}>
          {companyName}
        </Text>
      )}
      {email && (
        <Text style={{ ...pdfTypography.description, marginBottom: 12 }}>
          {formattedEmails}
        </Text>
      )}
      <View style={pdfTypography.description}>
        {companyAddress && <Text>{companyAddress}</Text>}
        {(companyCity || companyState || companyZip) && (
          <Text style={{ marginBottom: 2 }}>
            {[formattedLocation, companyZip].filter(Boolean).join(" ")}
          </Text>
        )}
        {companyCountry && (
          <Text style={{ marginBottom: 4 }}>{companyCountry}</Text>
        )}
        {formattedCompanyTaxId && <Text>ABN: {formattedCompanyTaxId}</Text>}
      </View>
    </View>
  );
};
