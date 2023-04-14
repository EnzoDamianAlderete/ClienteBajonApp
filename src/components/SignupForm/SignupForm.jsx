import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APIInstance } from '../../config/axios'

const INITIAL_STATE = {
	name: '',
	email: '',
	password: '',
	repassword: '',
}

const SignupForm = () => {
	const [form, setForm] = useState(INITIAL_STATE)
	const [errorMessage, setErrorMessage] = useState('')
	const [succesMessage, setSuccesMessage] = useState('')

	const { name, email, password, repassword } = form

	const navigate = useNavigate()

	const handleChange = evt => {
		setForm({
			...form,
			[evt.target.name]: evt.target.value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		console.log(form)
		if (name === '' || email === '' || password === '' || repassword === '') {
			setErrorMessage('Por favor complete todos los campos')
			console.log('Por favor complete todos los campos')
			setTimeout(() => {
				setErrorMessage('')
			}, 3000)
		} else if (password !== repassword) {
			setErrorMessage('Las contraseñas no coinciden')
			console.log('Las contraseñas no coinciden')
			setTimeout(() => {
				setErrorMessage('')
			}, 3000)
		} else if (
			name !== '' ||
			email !== '' ||
			password !== '' ||
			repassword !== ''
		) {
			const User = {
				name,
				email,
				password,
			}
			await APIInstance.post('/users', User)
				.then(res => {
					const { data } = res
					console.log(res.data)
					setSuccesMessage('Usuario creado correctamente!')
					console.log('Usuario creado!')
					setTimeout(() => {
						setSuccesMessage('')
						navigate('/login')
					}, 3000)
				})
				.catch(error => {
					setErrorMessage('Error!')
					console.log()
					setTimeout(() => {
						setErrorMessage('')
					}, 3000)
					console.error(error)
				})
		}
	}

	return (
		<Box
			as='form'
			bgcolor='white'
			padding='2em'
			borderRadius='8px'
			onSubmit={handleSubmit}>
			<TextField
				id='outlined-basic'
				label='Usuario'
				variant='outlined'
				margin='normal'
				fullWidth
				name='name'
				value={name}
				onChange={handleChange}
			/>
			<TextField
				id='outlined-basic'
				label='Email'
				variant='outlined'
				margin='normal'
				fullWidth
				type='email'
				name='email'
				value={email}
				onChange={handleChange}
			/>
			<TextField
				id='outlined-password-input'
				label='Contraseña'
				variant='outlined'
				margin='normal'
				fullWidth
				autoComplete='current-password'
				type='password'
				name='password'
				value={password}
				onChange={handleChange}
			/>
			<TextField
				id='outlined-password-input'
				label='Confirmar Contraseña'
				variant='outlined'
				margin='normal'
				fullWidth
				autoComplete='current-password'
				type='password'
				name='repassword'
				value={repassword}
				onChange={handleChange}
			/>

			<Button
				variant='contained'
				type='submit'
				sx={theme => ({
					background: theme.palette.custom.blue,
					'&:hover': { background: theme.palette.custom.blue },
					width: '100%',
					marginY: '1rem',
					fontSize: '1rem',
				})}>
				Registrarte
			</Button>
			<Box textAlign='center'>
				<Typography as='span' mr='0.5rem'>
					¿Tienes una cuenta?
				</Typography>
				<Link to='/login'>Inicia sesión</Link>
			</Box>
			{errorMessage && (
				<Box
					bgcolor='red'
					sx={{ color: 'white' }}
					padding='1em'
					marginY='1rem'
					borderRadius='8px'
					textAlign='center'>
					{errorMessage}
				</Box>
			)}

			{succesMessage && (
				<Box
					bgcolor='green'
					sx={{ color: 'white' }}
					padding='1em'
					marginY='1rem'
					borderRadius='8px'
					textAlign='center'>
					{succesMessage}
				</Box>
			)}
		</Box>
	)
}

export default SignupForm
