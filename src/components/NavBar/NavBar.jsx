import {
  AppBar,
  Box,
  CardMedia,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "../../assets/icons/home-icon.svg";
import ShoppingCartIcon from "../../assets/icons/shoppingCart-icon.svg";
import NotificationIcon from "../../assets/icons/notification-icon.svg";
import ProfileIcon from "../../assets/icons/profile-icon.svg";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./navbar.css";

const navBarItems = [
  { icon: HomeIcon, path: "/" },
  { icon: ShoppingCartIcon, path: "/orden" },
  { icon: NotificationIcon, path: "" },
  { icon: ProfileIcon, path: "/login" },
];

const NavBar = () => {
  const { cart, totalProductsInCart } = useAppContext();
  const location = useLocation();

  return (
    <>
      <Box>
        <AppBar
          position="fixed"
          sx={{
            top: "auto",
            bottom: 0,
            backgroundColor: "custom.dark",
            display: "flex",
          }}
        >
          <Toolbar>
            <Grid container justifyContent="space-around">
              {navBarItems.map((item) => (
                <Grid item>
                  <Box
                    sx={{
                      backgroundColor:
                        location.pathname === item.path ? "red" : undefined,
                      borderRadius: 4,
                      p: 1,
                    }}
                  >
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Link to={item.path}>
                          {item.path === "/orden" ? (
                            <Grid container>
                              <Grid item>
                                <CardMedia component="img" src={item.icon} />
                              </Grid>
                              <Grid item>
                                <Typography color="white" ml="8px">
                                  {totalProductsInCart}
                                </Typography>
                              </Grid>
                            </Grid>
                          ) : (
                            <CardMedia component="img" src={item.icon} />
                          )}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))}
              {/* <Grid item>
                <ListItem>
                  <div className='icon'>
                    <ListItemIcon
                      sx={{
                        backgroundColor: location.pathname === '/' ? 'red' : undefined,
                        borderRadius: 4,
                      }}>
                      <Link to='/'>
                        <img src={HomeIcon} />
                      </Link>
                    </ListItemIcon>
                  </div>
                </ListItem>
              </Grid>
              <Grid item>
                <ListItem>
                  <ListItemIcon
                    sx={{
                      backgroundColor: location.pathname === '/orden' ? 'red' : undefined,
                      borderRadius: 3,
                    }}>
                    <Link to='/orden'>
                      <img src={ShoppingCartIcon} />
                    </Link>
                    <Typography color='white' ml='8px'>
                      {totalProductsInCart}
                    </Typography>
                  </ListItemIcon>
                </ListItem>
              </Grid>
              <Grid item>
                <ListItem
                  sx={{
                    backgroundColor:
                      location.pathname === '/notificaciones' ? 'red' : undefined,
                  }}>
                  {' '}
                  <Link to='/notificaciones'>
                    <img src={NotificationIcon} />
                  </Link>
                </ListItem>
              </Grid>
              <Grid item>
                <ListItem
                  sx={{
                    backgroundColor: location.pathname === '/login' ? 'red' : undefined,
                  }}>
                  <ListItemIcon>
                    <Link to='/login'>
                      <img src={ProfileIcon} />
                    </Link>
                  </ListItemIcon>
                </ListItem>
              </Grid> */}
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
