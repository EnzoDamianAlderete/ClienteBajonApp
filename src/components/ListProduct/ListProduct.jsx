import { Box, Grid, Typography } from '@mui/material'
import CardProduct from '../CardProduct'

const ListProduct = ({ products, term }) => {
	const listProducts = products?.map(product => (
		<Grid item xs={12} md={6}>
			<CardProduct key={product.id} product={product} />
		</Grid>
	))

	const filteredProducts = products.filter(product => {
		if (product.name_product.toLowerCase().includes(term.toLowerCase())) {
			return product
		}

		if (product.category.toLowerCase().includes(term.toLowerCase())) {
			return product
		}
	})

	return (
		<>
			<Box mt='3rem' color='white'>
				<Typography my='1rem'>Recomendados</Typography>

				<Grid container spacing={2}>
					{term
						? filteredProducts?.map(product => (
								<Grid item xs={12} md={6}>
									<CardProduct key={product.id} product={product} />
								</Grid>
						  ))
						: listProducts}
				</Grid>
			</Box>
		</>
	)
}

export default ListProduct
