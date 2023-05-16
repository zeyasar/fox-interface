import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import loadingGif from "../images/loading.gif";
import { useNavigate } from "react-router-dom";

const DataTable = () => {
  const [data, setData] = useState([]); 
  const [expanded, setExpanded] = useState(false); 


  const navigate = useNavigate()

  const handleExpand = () => {
    setExpanded(true);
  };
  console.log(data);

  // const handleClick =(e)=>{
    
  // }

  useEffect(() => {
    axios
      .get("https://www.usom.gov.tr/api/address/index?per-page=100")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          {data.length === 0 ? (
            <Container maxWidth="sm">
              <img
                src={loadingGif}
                alt="loading_gif"
                style={{ width: "100%" }}
              />
            </Container>
          ) : data ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Adres</TableCell>
                    <TableCell>Eklenme Tarihi</TableCell>
                    <TableCell>Açıklama</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.models
                    ?.slice(0, expanded ? data.length : 10)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.url}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.desc}</TableCell>
                        <TableCell>
                          <Button onClick={()=>navigate(`/${row.id}`, { state:{searchTerm: `${row.url}`}})}>Whois Sorgu</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {!expanded && <Button onClick={handleExpand}>Genişlet</Button>}
            </TableContainer>
          ) : (
            <Container maxWidth="sm">
              <Typography variant="h2" component="h1" gutterBottom>
                I can't find data
              </Typography>
            </Container>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default DataTable;
