import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";
import searchIcon from "../../assets/icons/search-icon.svg";

const SearchForm = ({ handleSearchValue }) => {
  const SearchIcon = styled("img")({
    position: "absolute",
    right: "8px",
    top: "8px",
  });

  return (
    <Box
      as="form"
      flexDirection
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      boxShadow={8}
    >
      <TextField
        variant="filled"
        label="Buscar"
        fullWidth
        sx={{
          background: "white",
          borderRadius: "8px",
        }}
        onChange={handleSearchValue}
      />
      <SearchIcon src={searchIcon} alt="icono de búsqueda" />
    </Box>
  );
};

export default SearchForm;
