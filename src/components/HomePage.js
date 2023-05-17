import { Box, Container, Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'


const HomePage = () => {


  const [image, setImage] = useState('')
  const [quote, setQuote] = useState([])

  const fetchImage = useMemo(() => {
    return () => {
      axios.get('https://randomfox.ca/floof/')
        .then((data) => setImage(data.data.image));
    };
  }, []);
  
  const fetchQuote = useMemo(() => {
    return () => {
      axios.get('https://api.themotivate365.com/stoic-quote')
      .then((response) => {
        const { quote, author } = response.data;
        setQuote({ quote, author });
      });
    };
  }, []);

  const handleImageChange = () => {
    fetchImage();
  };
  
  const handleQuoteChange = () => {
    fetchQuote();
  };
 
  useEffect(() => {
    fetchImage()
    fetchQuote()
  }, [fetchImage, fetchQuote]);

  return (
    <Container
    sx={{justifyContent:'center', alignItems:'center', display:'flex', marginTop:'30px'}}
   
    >
    <Box>
    <Card sx={{ width: 500 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="400"
        image={`${image}`}
      />
      <CardActions >
        <Button size="small" onClick={handleImageChange} sx={{color:'rgb(255,112,0)'}}>Değiştir</Button> 
      </CardActions>
      <CardContent>
        
        <Typography variant="subtitle" color="text.secondary" sx={{fontStyle:'italic'}}>
          { quote?.quote }
        </Typography>
        <Typography variant="h6" color="text.secondary" marginTop={5}>
          -{ quote?.author }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleQuoteChange} sx={{color:'rgb(255,112,0)'}}>Değiştir</Button> 
      </CardActions>
    </Card>
    </Box>
      
    </Container>
  )
}

export default HomePage
