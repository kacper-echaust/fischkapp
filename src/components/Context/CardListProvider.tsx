import { createContext, useEffect, useState } from 'react'
import React from 'react'
import { Card } from '../types'
import { useFetch } from '../../hooks/useFetch'
import { API_URL } from '../config'
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
	isEmptyValue: boolean
	setIsEmptyValue: React.Dispatch<React.SetStateAction<boolean>>
}
const defaultState = [{ front: '', back: '', _id: '' }]
const defaultContext: CardContextType = {
	cardList: defaultState,
	setCardList: () => {},
	isAddingNewCard: false,
	setIsAddingNewCard: () => {},
	handleAddCard: () => {},
	isEmptyValue: false,
	setIsEmptyValue: () => {}
}

const CardContext = createContext<CardContextType>(defaultContext)

const CardListProvider = ({ children }) => {
	const [cardList, setCardList] = useState<Card[]>([])
	const { dataFromApi } = useFetch(API_URL)
	const [isAddingNewCard, setIsAddingNewCard] = useState(false)
	const [isEmptyValue,setIsEmptyValue] = useState(false)
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
				isEmptyValue,
				setIsEmptyValue
			}}>
			{children}
		</CardContext.Provider>
	)
}
export { CardListProvider, CardContext }
