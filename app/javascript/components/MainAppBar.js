import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
// import Link from '@mui/material/Link'; // <- Cannot use this Link.
// Has to be react-router-dom Link
import { Link } from 'react-router-dom';
// background color of AppBar: #1876d2

const MainAppBar = ({
  userRoleID,
  userEmail,
  loggedInStatus,
  handleLogout,
  selectedIndex,
  handleSelectedIndex,
}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [selectedIndex, setSelectedIndex] = React.useState(-1);
  let pages = ['Accounts', 'Revenues', 'Expenses', 'Expense Categories', 'Revenue Categories', 'Expense Sub Categories'];
  let dash = '/dashboard';

  const settings = ['Profile'];
  if (userRoleID === 1) {
    pages = ['Expenses'];
    dash = '/expenses';
  } else if (userRoleID === 3) {
    pages = [...pages, 'Users'];
    dash = '/dashboard';
  } else if (userRoleID === 4) {
    pages = ['Accounts', 'Revenues', 'Expenses'];
    dash = '/dashboard';
  } else {
    dash = '/dashboard';
  }

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

  const handleMenuItemClick = (event, index) => {
    handleSelectedIndex(index);
    // setSelectedIndex(index);
    setAnchorElNav(null);
  };

  const clearSelectedIndex = () => {
    handleSelectedIndex(-1);
    // setSelectedIndex(-1);
  };

  return (
    <AppBar position="static">
      { loggedInStatus === 'LOGGED_IN' && (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={dash}
              onClick={clearSelectedIndex}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Finance
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* // This is the drop down menu in the mobile view (small screen size) */}
                {/* {pages.map((page) => ( */}
                {pages.map((page, index) => (
                  <MenuItem
                    key={page}
                    selected={index === selectedIndex}
                    // onClick={handleCloseNavMenu}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {/* <Typography textAlign="center"> */}
                    <Link
                      to={`/${page.replace(/ /g, '_').toLowerCase()}`}
                      style={{
                        textDecoration: 'none',
                        color: index === selectedIndex ? 'white' : 'inherit',
                        backgroundColor: index === selectedIndex ? '#1876d2' : 'inherit',
                      }}
                    >
                      {page}
                    </Link>
                    {/* </Typography> */}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to={dash}
              onClick={clearSelectedIndex}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Finance
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* // This is working fine. Using Link from react-router-dom */}
              {/* // This is Button Link for App Bar Menu (in full screen mode) */}
              {/* {pages.map((page) => ( */}
              {pages.map((page, index) => (
                <Button
                  key={page}
                  selected={index === selectedIndex}
                  component={Link}
                  to={`/${page.replace(/ /g, '_').toLowerCase()}`}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  // sx={{ my: 2, color: 'white', display: 'block' }}
                  sx={{
                    my: 2,
                    color: index === selectedIndex ? 'black' : 'white',
                    backgroundColor: index === selectedIndex ? 'white' : 'inherit',
                    display: 'block',
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={userEmail}>{userEmail}</MenuItem>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                <MenuItem key="Logout" onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
};

MainAppBar.propTypes = {
  userRoleID: PropTypes.number.isRequired,
  userEmail: PropTypes.string.isRequired,
  loggedInStatus: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleSelectedIndex: PropTypes.func.isRequired,
};

export default MainAppBar;
