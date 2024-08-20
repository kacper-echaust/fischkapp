import { createContext, useEffect, useState } from 'react'
import React from 'react'
import { Card } from '../types'
import { useFetch } from '../../useFetch'
export enum CardSide {
	Front = 'front',
	Back = 'back',
}
type CardContextType = {
	cardList: Card[]
	setCardList: React.Dispatch<React.SetStateAction<Card[]>>
	isAddingNewCard: boolean
	setIsAddingNewCard: React.Dispatch<React.SetStateAction<boolean>>
	handleAddCard: () => void
	currentSide: string
	setCurrentSide: React.Dispatch<React.SetStateAction<CardSide>>
}
const defaultState = [{ front: '', back: '', _id: '' }]
const defaultContext: CardContextType = {
	cardList: defaultState,
	setCardList: () => {},
	isAddingNewCard: false,
	setIsAddingNewCard: () => {},
	handleAddCard: () => {},
	currentSide: CardSide.Front,
	setCurrentSide: () => {},
}

const CardContext = createContext<CardContextType>(defaultContext)

const CardListProvider = ({ children }) => {
	const [cardList, setCardList] = useState<Card[]>([])
	const { dataFromApi } = useFetch()
	const [isAddingNewCard, setIsAddingNewCard] = useState(false)
	const [currentSide, setCurrentSide] = useState(CardSide.Front)
	const handleAddCard = () => {
		setIsAddingNewCard(true)
	}
	useEffect(() => {
		setCardList(dataFromApi)
	}, [dataFromApi])

	return (
		<CardContext.Provider
			value={{
				cardList,
				setCardList,
				isAddingNewCard,
				setIsAddingNewCard,
				handleAddCard,
				currentSide,
				setCurrentSide,
			}}>
			{children}
		</CardContext.Provider>
	)
}
export { CardListProvider, CardContext }
