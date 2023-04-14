import {
  Button,
  CardActions,
  Stack,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from "@mui/material";
import plusIcon from "../../assets/icons/plus-icon.svg";
import minusIcon from "../../assets/icons/minus-icon.svg";
import { useAppContext } from "../../context/AppContext";
import IconTrash from "../../assets/icons/icon-trash.svg";
import "./OrderPage.css";
import { useEffect, useState } from "react";
import { APIInstance } from "../../config/axios";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeProductToCart,
    clearCart,
    removeProductItemFromCart,
    addToCart,
  } = useAppContext();
  console.log({ cart });
  const [askForTable, setAskForTable] = useState(false);
  const [pedidoSuccess, setPedidoSuccess] = useState(false);
  const [numeroMesa, setNumeroMesa] = useState(null);
  const [total, setTotal] = useState(0);
  const [pedido, setPedido] = useState({});
  const [nameUser, setNameUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [cartRender, setCartRender] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setNameUser(localStorage.getItem("name"));
    setIdUser(localStorage.getItem("id_user"));

    //cambio total
    const priceTotal = cart.reduce((acc, product) => {
      return acc + product.price * product.cantidad;
    }, 0);
    setTotal(priceTotal);
    const nuevosObjetos = cart.filter((x) => {
      if (!cartRender[x._id]) {
        cartRender[x._id] = true;
        return true;
      }
      return false;
    });
    setCartRender(nuevosObjetos);
  }, [total, cart]);

  const showConfirmationWall = () => {
    setAskForTable(true);
  };

  const confirmOrder = async () => {
    const detallePedido = cart.map((producto) => {
      return {
        producto: producto._id,
        cantidad: producto.cantidad,
      };
    });
    const newPedido = {
      name_user: nameUser,
      price: total,
      number_table: numeroMesa,
      userId: idUser,
      detalle_pedido: detallePedido,
    };
    setPedido(newPedido);

    await APIInstance.post("/orders", newPedido)
      .then(() => {
        setPedidoSuccess(true);
        clearCart();
      })
      .catch(() => {
        setError(true);
      });
  };

  const onConfirmSuccess = () => {
    navigate("/");
  };

  return (
    <>
      <Dialog open={askForTable || pedidoSuccess}>
        {pedidoSuccess ? (
          <>
            <DialogTitle>Pedido exitoso</DialogTitle>
            <DialogContent>
              Su pedido a sido registrado exitosamente!!
            </DialogContent>
            <DialogActions>
              <Button onClick={onConfirmSuccess}>Aceptar</Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Numero de mesa</DialogTitle>

            <DialogContent>
              <Grid container direction="column">
                <Grid item>
                  {error ? (
                    <Box sx={{ color: "red" }}>
                      {" "}
                      "ingrese el numero de mesa"
                    </Box>
                  ) : undefined}
                </Grid>
                <Grid item>
                  <TextField
                    required
                    type="number"
                    value={numeroMesa}
                    label="Ingrese su numero de mesa"
                    placeholder="Numero de mesa. Ejemplo: 12"
                    onChange={(e) => setNumeroMesa(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={confirmOrder}>Realizar Pedido</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Box
        paddingTop="32px"
        paddingBottom="16px"
        color="white"
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography color={"#009CFF"} fontFamily={"Anton"} fontSize="18px">
            {localStorage.getItem("name")}
          </Typography>
        </div>

        <Button
          variant="contained"
          sx={{ background: "#3C4045", marginY: "1rem", fontFamily: "Poppins" }}
          onClick={clearCart}
        >
          Vaciar carrito
        </Button>
      </Box>
      <Box>
        {cart.map((product) => (
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: "8px",
              marginBottom: "16px",
              borderRadius: "16px",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "50%", borderRadius: "16px" }}
              image="https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <Box>
              <CardContent
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  padding: 3,
                }}
              >
                <div className="contenedorOrden">
                  <div className="head1">
                    <Typography
                      variant="h5"
                      color="text.primary"
                      fontFamily="Cabin Condensed"
                    >
                      {product.name_product}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="custom.purple"
                      fontWeight="24px"
                    >
                      ${product.price}
                    </Typography>
                  </div>
                  <div className="head2">
                    <Typography
                      color="custom.dark"
                      fontWeight="16px"
                      fontFamily="Cabin"
                    >
                      Cantidad
                    </Typography>
                    <CardActions>
                      <Stack direction="row">
                        <CardMedia
                          component="img"
                          src={minusIcon}
                          onClick={() => removeProductItemFromCart(product._id)}
                        />
                        <Typography color="custom.dark" marginX="1rem">
                          {product.cantidad ?? 1}
                        </Typography>
                        <CardMedia
                          component="img"
                          src={plusIcon}
                          onClick={() => addToCart(product)}
                        />
                      </Stack>
                    </CardActions>
                  </div>
                  <div className="head3">
                    <img
                      src={IconTrash}
                      alt="icon trash"
                      style={{ width: "24px", position: "flex" }}
                      onClick={() => removeProductToCart(product.id)}
                    />
                  </div>
                </div>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        my="3rem"
      >
        <div className="total">
          <Typography
            fontFamily={"Anton"}
            color="custom.white"
            fontWeight="32px"
            fontSize="24px"
          >
            Total:
            <Typography
              component="span"
              fontFamily={"Roboto Condensed"}
              color="custom.green"
              fontSize="32px"
              marginX="1rem"
            >
              $ {total}
            </Typography>
          </Typography>
        </div>
        <Button
          sx={{ fontFamily: "Poppins" }}
          variant="contained"
          onClick={() => showConfirmationWall()}
        >
          Confirmar
        </Button>
      </Stack>
    </>
  );
};

export default OrderPage;
