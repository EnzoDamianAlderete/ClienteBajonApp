import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";
import burgerIcon from "../../assets/icons/hamburguer-icon.svg";
import iceCreamIcon from "../../assets/icons/iceCream-icon.svg";
import hotdogIcon from "../../assets/icons/hotDog-icon.svg";
import pizzaIcon from "../../assets/icons/pizza-icon.svg";
import drinkIcon from "../../assets/icons/drink-icon.svg";
import { useAppContext } from "../../context/AppContext";
import {} from "./categories.css";

const Categories = () => {
  const IconCategorie = styled("img")();

  const { handleGetProduct } = useAppContext();

  return (
    <>
      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        color="white"
        paddingTop="48px"
        paddingBottom="32px"
        className="categorias"
      >
        <Box onClick={handleGetProduct}>
          <IconCategorie src={pizzaIcon} />
          <Typography>
            <h1>Pizzas</h1>
          </Typography>
        </Box>
        <Box onClick={handleGetProduct}>
          <IconCategorie src={drinkIcon} />
          <Typography>
            <h1>Bebidas</h1>
          </Typography>
        </Box>
        <Box onClick={handleGetProduct}>
          <IconCategorie src={burgerIcon} />
          <Typography>
            <h1>Burguers</h1>
          </Typography>
        </Box>
        <Box onClick={handleGetProduct}>
          <IconCategorie src={hotdogIcon} />
          <Typography>
            <h1>Panchos</h1>
          </Typography>
        </Box>
        <Box onClick={handleGetProduct}>
          <IconCategorie src={iceCreamIcon} />
          <Typography>
            <h1>Postres</h1>
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Categories;
