import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { APIInstance } from "../config/axios";

const AppContext = createContext();

const { Provider } = AppContext;

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState();
  const [term, setTerm] = useState("");

  const totalProductsInCart = useMemo(() => {
    return cart.reduce((acc, product) => {
      const cantidadActual = product?.cantidad ?? 1;

      return acc + cantidadActual;
    }, 0);
  }, [cart]);

  const getData = async () => {
    try {
      const response = await APIInstance.get("/products");
      setData(response.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const addToCart = (product) => {
    const productInCart = cart.find((p) => {
      return p._id === product._id;
    });
    if (productInCart) {
      const newProduct = {
        ...productInCart,
        cantidad: (productInCart?.cantidad ?? 1) + 1,
      };
      const newCart = cart.filter((p) => {
        return p._id !== product._id;
      });
      setCart([...newCart, newProduct]);
    } else {
      setCart([...cart, { ...product, cantidad: 1 }]);
    }
  };

  const removeProductToCart = (id) => {
    const cartUpdate = cart.filter((product) => product.id !== id);
    setCart(cartUpdate);
  };

  const removeProductItemFromCart = (id) => {
    const productInCart = cart.find((p) => p._id === id);
    const newQty = (productInCart?.cantidad ?? 1) - 1;
    if (newQty) {
      const newProductInCart = { ...productInCart, cantidad: newQty };
      const cartWithoutProduct = cart.filter((p) => p._id !== id);
      setCart([...cartWithoutProduct, newProductInCart]);
    } else {
      const cartUpdate = cart.filter((product) => product._id !== id);
      setCart(cartUpdate);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleSearchValue = (evt) => {
    setTerm(evt.target.value);
  };

  const handleGetProduct = (evt) => setTerm(evt.currentTarget.textContent);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Provider
      value={{
        data,
        loading,
        error,
        cart,
        totalProductsInCart,
        addToCart,
        removeProductItemFromCart,
        removeProductToCart,
        clearCart,
        token,
        setToken,
        term,
        handleGetProduct,
        handleSearchValue,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
