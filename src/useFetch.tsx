import { useEffect, useState } from 'react'
import { Card } from './components/types'
enum Methods {
	Post = 'POST',
	Patch = 'PATCH',
	Delete = 'DELETE',
}
const URL = 'https://training.nerdbord.io/api/v1/fischkapp/flashcards'
const useFetch = () => {
	const [dataFromApi, setDataFromApi] = useState<Card[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		fetch(URL, {
			method: 'GET',
		})
			.then(res => {
				if (res.ok) {
					console.log('Succes')
					return res.json()
				} else {
					throw new Error()
				}
			})
			.then(data => {
				setDataFromApi(data)
				setIsLoading(false)
			})
			.catch(error => {
				setIsLoading(false)
				console.error(`Failed to fetch flashcards: ${error}`)
			})
	}, [])
	const addNewCard =  (front: string, back: string) => {
		const options = {
			headers: {
				Authorization: 'secret_token',
			},
			body: JSON.stringify({ front: front, back: back }),
		}
		 fetchData(Methods.Post, URL, options)
	}
	const editCard =  (id: string, front: string, back: string) => {
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
		 fetchData(Methods.Patch, `${URL}/${id}`, options)
	}
	const deleteCard =  (id: string) => {
		const options = {
			headers: {
				Authorization: 'secret_token',
			},
		}
		 fetchData(Methods.Delete, `${URL}/${id}`, options)
		setDataFromApi(prevData => {
			return prevData.filter(() => {
				id !== prevData['_id']
			})
		})
	}
	const fetchData = (
		method = Methods.Post,
		URL: string,
		options: {
			headers: {
				Authorization: string
			}
			body?: string
		}
	) => {
		setIsLoading(true)
		fetch(URL, {
			method: method,
			...options,
		})
			.then(res => {
				if (res.ok) {
					return res.json()
				}
				throw new Error('Network response was not ok')
			})
			.then(data => {
				console.log(`Succes`, data)
				setDataFromApi(data)
				setIsLoading(false)
			})
			.catch(error => {
				console.error('Error', error)
			})
	}
	return { dataFromApi, setDataFromApi, isLoading, addNewCard, editCard, deleteCard }
}

export { useFetch }
