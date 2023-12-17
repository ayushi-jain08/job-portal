import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "./Navbar.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import avtar from "../../Images/avtar.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { clearError, fetchLogout } from "../../Redux/Slices/User";

const Navbar = ({ scrollPosition, path = "login" }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const isHome = location.pathname === "/";
  const handleLogout = async () => {
    await dispatch(fetchLogout());
    await dispatch(clearError());
    navigate(`/${path}`, {
      state: location.pathname,
    });
    localStorage.removeItem("userDataInfo");
  };
  return (
    <>
      <AppBar
        position="fixed"
        className={
          scrollPosition > 50 || !isHome ? "navbar scrolled" : "navbar"
        }
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

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
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <NavLink to="/">
                    <Typography
                      sx={{
                        p: 1,
                        textTransform: "uppercase",
                        color: "black",
                      }}
                      textAlign="center"
                    >
                      Home
                    </Typography>
                  </NavLink>
                  <NavLink to="/job">
                    <Typography
                      sx={{
                        p: 1,
                        textTransform: "uppercase",
                        color: "black",
                      }}
                      textAlign="center"
                    >
                      Jobs
                    </Typography>
                  </NavLink>
                  <NavLink to="/about">
                    <Typography
                      sx={{
                        p: 1,
                        textTransform: "uppercase",
                        color: "black",
                      }}
                      textAlign="center"
                    >
                      About
                    </Typography>
                  </NavLink>
                  <NavLink to="/employer">
                    <Typography
                      sx={{
                        p: 1,
                        textTransform: "uppercase",
                        color: "black",
                      }}
                      textAlign="center"
                    >
                      Employeer
                    </Typography>
                  </NavLink>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                      justifyContent: "center",
                      gap: "3px",
                    }}
                  >
                    <AdbIcon sx={{ display: { xs: "flex", md: "none" } }} />
                    <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href="#app-bar-with-responsive-menu"
                      sx={{
                        display: { xs: "flex", md: "none" },

                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      LOGO
                    </Typography>
                  </div>
                </MenuItem>
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center", // Center horizontally
                alignItems: "center",
              }}
            >
              <NavLink to="/">
                <Typography
                  textAlign="center"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, px: 2, color: "white" }}
                >
                  Home
                </Typography>
              </NavLink>
              <NavLink to="/job">
                <Typography
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, px: 2, color: "white" }}
                  textAlign="center"
                >
                  Jobs
                </Typography>
              </NavLink>
              <NavLink to="/about">
                <Typography
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, px: 2, color: "white" }}
                  textAlign="center"
                >
                  About
                </Typography>
              </NavLink>
              <NavLink to="/employer">
                <Typography
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, px: 2, color: "white" }}
                  textAlign="center"
                >
                  Employeer
                </Typography>
              </NavLink>
            </Box>

            {storedUserInfo ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      style={{ backgroundColor: "white" }}
                      alt="Remy Sharp"
                      src={avtar}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    style={{ display: "block", margin: "none" }}
                  >
                    <NavLink to="/profile">
                      <p
                        style={{
                          textAlign: "center",
                          color: "black",
                          padding: "5px",
                        }}
                      >
                        Profile
                      </p>
                    </NavLink>

                    <p
                      style={{
                        textAlign: "center",
                        color: "black",
                        padding: "5px",
                      }}
                      onClick={handleLogout}
                    >
                      logout
                    </p>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <div className="login-my-account">
                <Link to="/login">
                  <AccountCircleIcon className="icon" />
                  <span>login</span>
                </Link>{" "}
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
