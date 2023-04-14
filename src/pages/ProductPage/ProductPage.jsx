import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { APIInstance } from '../../config/axios'
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Stack,
	Typography,
} from '@mui/material'
import addIcon from '../../assets/icons/plus-icon.svg'
import plusIcon from '../../assets/icons/plus-icon.svg'
import minusIcon from '../../assets/icons/minus-icon.svg'

const ProductPage = () => {
	const [product, setProduct] = useState({})

	const { id } = useParams()

	const getProductById = async () => {
		try {
			const response = await APIInstance.get('/products', id)
			const product = response.data.find(product => product._id === id)
			setProduct(product)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getProductById()
	}, [])

	return (
		<Card sx={{ mt: '2rem', borderRadius: '8px' }}>
			<CardMedia
				component='img'
				alt={product.name_product}
				height='240'
				image={product.imgUrl}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5' color='custom.dark'>
					{product.name_product}
				</Typography>
				<Typography variant='body2' color='text.secondary' my={3}>
					{product.description_product}
				</Typography>
				<Typography
					color='custom.dark'
					fontWeight='600'
					textAlign='center'
					marginRight='4rem'>
					Cantidad
				</Typography>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'>
					<Typography variant='h6' color='custom.purple' fontWeight='600'>
						${product.price}
					</Typography>
					<CardActions>
						<Stack direction='row' justifyContent='space-between'>
							<CardMedia
								component='img'
								src={minusIcon}
								onClick={() => console.log('restando platos...')}
							/>
							<Typography color='custom.dark' marginX='1rem'>
								3
							</Typography>
							<CardMedia
								component='img'
								src={plusIcon}
								onClick={() => console.log('agregando platos...')}
							/>
						</Stack>
					</CardActions>
					<CardActions>
						<Typography
							variant='p'
							color='custom.blue'
							mr='1rem'
							fontWeight='600'>
							Pedir
						</Typography>
						<CardMedia
							component='img'
							src={addIcon}
							onClick={() => console.log('ordenando platos...')}
						/>
					</CardActions>
				</Stack>
			</CardContent>
		</Card>
	)
}

export default ProductPage
