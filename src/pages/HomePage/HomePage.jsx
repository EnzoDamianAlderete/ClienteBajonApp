import Categories from '../../components/Categories/Categories'
import ListProduct from '../../components/ListProduct'
import Loader from '../../components/Loader/Loader'
import SearchForm from '../../components/SearchForm'
import { useAppContext } from '../../context/AppContext'
import { Alert } from '@mui/material'

const HomePage = () => {
	const { data, loading, error, term, handleSearchValue } = useAppContext()

	if (error)
		return (
			<Alert variant='filled' severity='error' sx={{ mt: '3rem' }}>
				Se ha producido un error!
			</Alert>
		)

	if (loading) return <Loader />

	return (
		<>
			<Categories />
			<SearchForm handleSearchValue={handleSearchValue} />
			<ListProduct products={data} term={term} />
		</>
	)
}

export default HomePage
