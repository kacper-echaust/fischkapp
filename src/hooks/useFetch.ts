import { useEffect, useState } from 'react'
import { Card } from '../components/types'
export enum Methods {
	Post = 'POST',
	Patch = 'PATCH',
	Delete = 'DELETE',
}
const useFetch = (url: string) => {
	const [dataFromApi, setDataFromApi] = useState<Card[]>([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		fetch(url, {
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
	return { dataFromApi, setDataFromApi, isLoading, fetchData }
}

export { useFetch }
