import { Box, CircularProgress } from '@mui/material'

const Loader = () => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', mt: '3rem' }}>
			<CircularProgress />
		</Box>
	)
}

export default Loader
