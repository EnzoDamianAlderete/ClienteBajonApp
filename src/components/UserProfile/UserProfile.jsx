import { useState, useEffect } from "react";
import {
  CardContent,
  Typography,
  Button,
  Grid,
  Card,
  Box,
  CardActions,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { APIInstance } from "../../config/axios";
import Header from "../Header";
import NavBar from "../NavBar";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const { token, setToken } = useAppContext();

  const sesionClose = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  useEffect(() => {
    if (token) {
      APIInstance.get(`https://bajonappbackend-production.up.railway.app/user`, {
        headers: {
          token: token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          setUserName(data.name);
          setUserEmail(data.email);
        })
        .catch((error) => console.error(error));
    }
  });

  return (
    <>
      <Header />
      <Grid container spacing={2} paddingTop={2} mt="6rem">
        <Grid item xs={12} padding={2}>
          <Card
            sx={{ minWidth: 275, maxWidth: "100%", elevation: 2, padding: 4 }}
          >
            <Box>
              <svg
                width="100"
                height="100"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4ZM4 18c0-2.66 5.33-4 8-4s8 1.34 8 4v2H4v-2Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Box>
            <CardContent>
              <Typography variant="h5" color="dark">
                Bienvenido {userName} !
              </Typography>
              <Typography variant="body2" component="div">
                Nombre usuario:
                {userName}
              </Typography>
              <Typography variant="body2">Email: {userEmail}</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={sesionClose}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "custom.skyBlue",
                  marginTop: "2rem",
                }}
              >
                Cerrar Sesión
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <NavBar />
    </>
  );
};

export default UserProfile;
