import { useEffect, useState } from 'react'
import { Card } from './components/types'

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
	const addNewCard = (front: string, back: string) => {
		setIsLoading(true)
		fetch(URL, {
			method: 'POST',
			headers: {
				Authorization: 'secret_token',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				front: front,
				back: back,
			}),
		})
			.then(res => {
				if (res.ok) {
					return res.json()
				}
				throw new Error('Network response was not ok')
			})
			.then(data => {
				console.log(`Succes`, data)
				setDataFromApi(prevData => {
					return [...prevData, data]
				})
				setIsLoading(false)
			})
			.catch(error => {
				console.error('Error', error)
			})
	}
	return { dataFromApi, setDataFromApi, isLoading, addNewCard }
}

export { useFetch }
