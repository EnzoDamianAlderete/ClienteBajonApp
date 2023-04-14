import { Container } from "@mui/material";
import AppProvider from "./context/AppContext";
import PublicRoutes from "./routes/PublicRoutes";

const App = () => {
  return (
    <>
      <Container>
        <AppProvider>
          <PublicRoutes />
        </AppProvider>
      </Container>
    </>
  );
};

export default App;
