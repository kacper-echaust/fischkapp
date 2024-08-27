import { API_URL } from '../components/config'
import { Methods, useFetch } from './useFetch'

const useCardsApi = (url: string) => {
	const { fetchData } = useFetch(API_URL)
	const addNewCard = (front: string, back: string) => {
		const options = {
			headers: {
				Authorization: 'secret_token',
			},
			body: JSON.stringify({ front: front, back: back }),
		}
		fetchData(Methods.Post, url, options)
	}

	const editCard = (id: string, front: string, back: string) => {
		const options = {
			headers: {
				Authorization: 'secret_token',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				front: front,
				back: back,
			}),
		}
		fetchData(Methods.Patch, `${url}/${id}`, options)
	}

	const deleteCard = (id: string) => {
		const options = {
			headers: {
				Authorization: 'secret_token',
			},
		}
		fetchData(Methods.Delete, `${url}/${id}`, options)
	}
	return {
		addNewCard,
		editCard,
		deleteCard,
	}
}

export { useCardsApi }
