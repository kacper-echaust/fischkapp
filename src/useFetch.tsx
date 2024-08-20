import { useEffect, useState } from 'react'
import { Card } from './components/types'

const useFetch = () => {
	const [dataFromApi, setDataFromApi] = useState<Card[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch('https://training.nerdbord.io/api/v1/fischkapp/flashcards', {
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
	return { dataFromApi, setDataFromApi, isLoading }
}

export { useFetch }
