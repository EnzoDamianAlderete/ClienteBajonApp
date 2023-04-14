import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  Stack,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import addIcon from '../../assets/icons/add-icon.svg';

const CardProduct = ({ product }) => {
  const { name_product, description_product, price, _id, imgUrl } = product;

  const { addToCart } = useAppContext();

  return (
    <Card sx={{ mb: '1rem', borderRadius: '8px' }}>
      <Link to={`/producto/${_id}`}>
        <CardMedia component='img' alt={name_product} height='240' image={imgUrl} />
      </Link>
      <CardContent>
        <Typography gutterBottom variant='h5' color='custom.dark'>
          {name_product}
        </Typography>
        <Typography variant='body2' color='text.secondary' my={3}>
          {description_product}
        </Typography>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='h6' color='custom.purple' fontWeight='600'>
            ${price}
          </Typography>
          <CardActions>
            <IconButton onClick={() => addToCart(product)}>
              <CardMedia component='img' src={addIcon} />
            </IconButton>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardProduct;
