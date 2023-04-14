import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import HomePage from '../pages/HomePage/HomePage'
import ProductPage from '../pages/ProductPage'
import OrderPage from '../pages/OrderPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'producto/:id',
				element: <ProductPage />,
			},
			{
				path: '/orden',
				element: <OrderPage />,
			},
		],
	},
	{
		path: '/signup',
		element: <SignupPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
])

const PublicRoutes = () => {
	return <RouterProvider router={router} />
}

export default PublicRoutes
