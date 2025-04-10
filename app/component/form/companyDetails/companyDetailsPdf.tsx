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
}) => (
  <View style={pdfContainers.CompanyDetails}>
    <Text style={{ ...pdfTypography.title, marginBottom: 14 }}>To</Text>
    {companyName && (
      <Text style={{ ...pdfTypography.text2xl, flexWrap: "wrap" }}>
        {companyName}
      </Text>
    )}
    {email && (
      <Text style={{ ...pdfTypography.description, marginBottom: 12 }}>
        {email}
      </Text>
    )}
    <View style={pdfTypography.description}>
      {companyAddress && <Text>{companyAddress}</Text>}
      {(companyCity || companyState || companyZip) && (
        <Text style={{ marginBottom: 2 }}>
          {companyCity}, {companyState} {companyZip}
        </Text>
      )}
      {companyCountry && (
        <Text style={{ marginBottom: 4 }}>{companyCountry}</Text>
      )}
      {companyTaxId && <Text>ABN: {companyTaxId}</Text>}
    </View>
  </View>
);
