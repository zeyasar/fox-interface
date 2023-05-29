import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Box } from "@mui/material";

const DomainCheck = () => {
  let { state } = useLocation();
  const { searchTerm } = state;
  // console.log(searchTerm);
  const [domainData, setDomainData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.ip2whois.com/v2?key=9960FD38B20C598392E66532BEFFFEBA&domain=${searchTerm}`
      )
      .then((response) => {
        setDomainData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(domainData);

  return (
    <Container>
      <Box>
        <h2>Whois Bilgileri</h2>
        <p>
          Domain: {domainData?.domain}
          <br />
          Domain ID: {domainData?.domain_id}
          <br />
          Durum: {domainData?.status}
          <br />
          Oluşturma Tarihi: {domainData?.create_date}
          <br />
          Güncelleme Tarihi: {domainData?.update_date}
          <br />
          Son Kullanma Tarihi: {domainData?.expire_date}
          <br />
          Domain Yaşı: {domainData?.domain_age}
        </p>

        <h3>Registrar Bilgileri</h3>
        <p>
          IANA ID: {domainData?.registrar?.iana_id}
          <br />
          Ad: {domainData?.registrar?.name}
          <br />
          URL: {domainData?.registrar?.url}
        </p>

        <h3>Registrant Bilgileri</h3>
        <p>
          Ad: {domainData?.registrant?.name}
          <br />
          Organizasyon: {domainData?.registrant?.organization}
          <br />
          Adres: {domainData?.registrant?.street_address},{" "}
          {domainData?.registrant?.city}, {domainData?.registrant?.region},{" "}
          {domainData?.registrant?.zip_code}, {domainData?.registrant?.country}
          <br />
          Telefon: {domainData?.registrant?.phone}
          <br />
          E-posta:{" "}
          <a href={domainData?.registrant?.email}>
            {domainData?.registrant?.email}
          </a>
        </p>

        <h3>Admin Bilgileri</h3>
        <p>
          Ad: {domainData?.admin?.name}
          <br />
          Organizasyon: {domainData?.admin?.organization}
          <br />
          Adres: {domainData?.admin?.street_address}, {domainData?.admin?.city},{" "}
          {domainData?.admin?.region}, {domainData?.admin?.zip_code},{" "}
          {domainData?.admin?.country}
          <br />
          Telefon: {domainData?.admin?.phone}
          <br />
          E-posta:{" "}
          <a href={domainData?.admin?.email}>{domainData?.admin?.email}</a>
        </p>

        <h3>Tech Bilgileri</h3>
        <p>
          Ad: {domainData?.tech?.name}
          <br />
          Organizasyon: {domainData?.tech?.organization}
          <br />
          Adres: {domainData?.tech?.street_address}, {domainData?.tech?.city},{" "}
          {domainData?.tech?.region}, {domainData?.tech?.zip_code},{" "}
          {domainData?.tech?.country}
          <br />
          Telefon: {domainData?.tech?.phone}
          <br />
          E-posta: <a href={domainData?.tech?.email}>{domainData?.tech?.email}</a>
        </p>

        <h3>Fatura Bilgileri</h3>
        <p>
          Ad: {domainData?.billing?.name}
          <br />
          Organizasyon: {domainData?.billing?.organization}
          <br />
          Adres: {domainData?.billing?.street_address},{" "}
          {domainData?.billing?.city}, {domainData?.billing?.region},{" "}
          {domainData?.billing?.zip_code}, {domainData?.billing?.country}
          <br />
          Telefon: {domainData?.billing?.phone}
          <br />
          E-posta:{" "}
          <a href={domainData?.billing?.email}>{domainData?.billing?.email}</a>
        </p>

        <h3>Nameserverlar</h3>
        <ul>
          {domainData?.nameservers?.map((nameserver, index) => (
            <li key={index}>{nameserver}</li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

export default DomainCheck;
