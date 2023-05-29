import { Box, Container, Button, TextField, InputLabel, Typography } from '@mui/material';
import React, { useState } from 'react';

function IPCheck() {
  const [userInput, setUserInput] = useState('');
  const [firstIP, setFirstIP] = useState('');
  const [lastIP, setLastIP] = useState('');
  const [middleIPs, setMiddleIPs] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const generateIPAddresses = () => {
    const ipAddress = userInput.trim();
    const ipAddressParts = ipAddress.split('.');
    const lastByte = Number(ipAddressParts[3]);

    if (lastByte >= 1 && lastByte <= 254) {
      const first = ipAddressParts.slice(0, 3).join('.');
      const middle = [];
      for (let i = 50; i <= 250; i += 50) {
        middle.push(`${first}.${i}`);
      }
      const last = `${first}.254`;

      setFirstIP(`${first}.1`);
      setMiddleIPs(middle);
      setLastIP(last);
    } else {
      setFirstIP('');
      setMiddleIPs([]);
      setLastIP('');
    }
  };

  return (
    <Container>
    <Box marginTop={5}>
      <InputLabel htmlFor="outlined-basic">Bir IP Adresi Girin: </InputLabel>
      {/* <input type="text" id="ipAddress"   /> */}
      <TextField id="outlined-basic"  variant="outlined" value={userInput} onChange={handleInputChange}/>
      <Button onClick={generateIPAddresses} sx={{color:'rgb(255,112,0)'}}>Olustur</Button>
      <Typography variant='h4' marginTop={4}>Oluşturulan IP Adresleri:</Typography>
      <Typography>İlk IP adresi: {firstIP}</Typography>
      <Typography>Son IP adresi: {lastIP}</Typography>
      <Typography variant='h6'>Aradaki IP Adresleri:</Typography>
      <ul>
        {middleIPs.map((ip) => (
          <li key={ip}>{ip}</li>
        ))}
      </ul>
      </Box>
    </Container>
  );
}

export default IPCheck;

