import React, { useMemo, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleHomepage = () => {
    setAnchorElNav(null);
    navigate("/");
  };
  const handleTable = () => {
    setAnchorElNav(null);
    navigate("/zararli-siteler");
  };
  const handleIp = () => {
    setAnchorElNav(null);
    navigate("/ip-check");
  };

  const [data, setData] = useState([]);

  const fetchWeather = useMemo(() => {
    return () => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=ankara&appid=86d30bb57c3b71dd5211a01a1d9d07a5&units=metric&lang=tr`
        )
        .then((data) => setData(data.data));
    };
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const temp = Math.round(data?.main?.temp);
  const iconUrl =
    data.weather && data.weather.length > 0
      ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      : "";

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(90deg, rgba(255,112,0,1) 0%, rgba(255,255,255,1) 71%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleHomepage}>
                <Typography textAlign="center">Anasayfa</Typography>
              </MenuItem>
              <MenuItem onClick={handleTable}>
                <Typography textAlign="center">Zararlı Siteler</Typography>
              </MenuItem>
              <MenuItem onClick={handleIp}>
                <Typography textAlign="center">IP</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleHomepage}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {" "}
              Anasayfa
            </Button>
            <Button
              onClick={handleTable}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {" "}
              Zararlı Siteler
            </Button>
            <Button
              onClick={handleIp}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {" "}
              IP
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexGrow: 0 }}>
            <Card
              sx={{
                display: "flex",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto", marginTop: "5px" }}>
                  <Typography component="div" variant="body2">
                    {hours}:{minutes < 10 ? "0" + minutes : minutes}:
                    {seconds < 10 ? "0" + seconds : seconds}
                  </Typography>
                  <Typography component="div" variant="body2">
                    Ankara
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {temp}
                    <sup>°C</sup>
                  </Typography>
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={iconUrl}
                alt="weatherIcon"
              />
            </Card>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
