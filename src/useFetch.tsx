import { useEffect, useState } from 'react'
import { Card } from './components/types'

const useFetch = () => {
	const [dataFromApi, setDataFromApi] = useState<Card[]>([])

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
			.then(data => setDataFromApi(data))
			.catch(error => console.log(`Error: ${error}`))
	}, [])
	return { dataFromApi,setDataFromApi }
}

export { useFetch }
