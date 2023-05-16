import * as React from "react";
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

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleHomepage = () => {
    setAnchorElNav(null)
    navigate('/')
  }
  const handleTable = () => {
    setAnchorElNav(null)
    navigate('/zararli-siteler')
  }
  const handleIp = () => {
    setAnchorElNav(null)
    navigate('/ip-check')
  }

  return (
    <AppBar position="static" sx={{backgroundColor:'rgb(255,112,0)'}}>
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
              Zararli Siteler
            </Button>
            <Button
              onClick={handleIp}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {" "}
              IP
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* buraya hava durumu verileri gelecek */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
