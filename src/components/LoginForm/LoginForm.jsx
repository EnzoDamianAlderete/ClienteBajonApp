import { useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Button,
  Typography,
  Radio,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { APIInstance } from "../../config/axios";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { email, password } = form;

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Por favor complete todos los campos");
      console.log("Por favor complete todos los campos");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } else if (email !== "" || password !== "") {
      const User = {
        email,
        password,
      };
      await APIInstance.post("/login", User)
        .then((res) => {
          localStorage.setItem("token", res.data?.user.token);
          console.log(res.data);
          localStorage.setItem("name", res.data?.user.name);
          localStorage.setItem("id_user", res.data?.user.id);
          setSuccessMessage("Sesion iniciada correctamente!");
          console.log(
            `Sesion iniciada correctamente! Bienvenido ${res.data.user.name}`
          );
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/");
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage("Correo u contraseña incorrecta");
          console.log("Correo u contraseña incorrecta");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
          console.error(error);
        });
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
      as="form"
      bgcolor="white"
      padding="2em"
      borderRadius="8px"
    >
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        value={email}
        name="email"
        onChange={handleChange}
      />
      <TextField
        id="outlined-password-input"
        label="Contraseña"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        autoComplete="current-password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <FormControlLabel
        value="a"
        name="radio"
        control={<Radio />}
        inputProps={{ "aria-label": "A" }}
        label="Mantener conectado"
        labelPlacement="End"
        sx={(theme) => ({
          color: theme.palette.custom.dark,
        })}
      />
      <Link href="#" color="purple">
        Recuperar contraseña
      </Link>
      <Button
        type="submit"
        variant="contained"
        sx={(theme) => ({
          background: theme.palette.custom.blue,
          "&:hover": { background: theme.palette.custom.blue },
          width: "100%",
          marginY: "1rem",
          fontSize: "1rem",
        })}
      >
        Iniciar Sesión
      </Button>

      <Box textAlign="center">
        <Typography as="span" mr="0.5rem">
          ¿No tienes una cuenta?
        </Typography>
        <Link to="/signup">Regístrate</Link>
      </Box>
      {errorMessage && (
        <Box
          bgcolor="red"
          sx={{ color: "white" }}
          padding="1em"
          marginTop="1rem"
          borderRadius="8px"
          textAlign="center"
        >
          {errorMessage}
        </Box>
      )}

      {successMessage && (
        <Box
          bgcolor="green"
          sx={{ color: "white" }}
          padding="1em"
          marginTop="1rem"
          borderRadius="8px"
          textAlign="center"
        >
          {successMessage}
        </Box>
      )}
    </Box>
  );
};

export default LoginForm;
