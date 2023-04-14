import { useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import UserProfile from "../../components/UserProfile/UserProfile";
import { Box, Typography } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import ArrowLeft from "../../assets/icons/icon-arrow-left.svg";
import Header from "../../components/Header/Header";
import "./LoginPage.css";

const LoginPage = () => {
  const { token, setToken } = useAppContext();

  useEffect(
    (token) => {
      setToken(localStorage.getItem("token"));
    },
    [token]
  );

  return token ? (
    <UserProfile />
  ) : (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: 2,
        minHeight: "100vh",
      }}
    >
      <Header />
      <div className="head">
        <Link to="/" style={{ color: "white" }}>
          <img src={ArrowLeft} alt="arrow icon " />
        </Link>
        <Typography fontSize="24px" pl="90px" color="white" fontFamily="Anton">
          Iniciar Sesión
        </Typography>
      </div>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
