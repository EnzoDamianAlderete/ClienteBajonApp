import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <AppBar
      sx={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "custom.dark",
        zIndex: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "60px" }} />
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontFamily: "Poppins",
            // paddingLeft: "24px",
          }}
        >
          BajonApp
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
