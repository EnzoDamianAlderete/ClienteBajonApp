import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import SignupForm from '../../components/SignupForm'
import ArrowLeft from '../../assets/icons/icon-arrow-left.svg'

const SignupPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignContent: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				padding: 2,
				minHeight: '100vh',
			}}>
			<Link to='/' style={{ color: 'white' }}>
				<img src={ArrowLeft} alt='arrow icon ' />
			</Link>
			<Typography fontSize='2rem' marginY='1rem' color='white'>
				Crea una cuenta
			</Typography>
			<SignupForm />
		</Box>
	)
}
export default SignupPage
