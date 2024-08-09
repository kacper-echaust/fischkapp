import { createContext, useState } from 'react'
import React from 'react'
import { Card } from '../types'

type CardContextType = {
	cardList: Card[]
	setCardList: React.Dispatch<React.SetStateAction<Card[]>>
	isAdding: boolean
	setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
	editingCard: Card
	setEditingCard: React.Dispatch<React.SetStateAction<Card>>
	isSecondSide: boolean
	setIsSecondSide: React.Dispatch<React.SetStateAction<boolean>>
}
const defaultState = [{ title: '', value: '' }]
const defaultContext: CardContextType = {
	cardList: defaultState,
	setCardList: () => {},
	isAdding: false,
	setIsAdding: () => {},
	editingCard: {
		title: '',
		value: '',
	},
	setEditingCard: () => {},
	isSecondSide: false,
	setIsSecondSide: () => {},
}

const CardContext = createContext<CardContextType>(defaultContext)

const CardListProvider = ({ children }) => {
	const [editingCard, setEditingCard] = useState<Card>({
		title: '',
		value: '',
	})
	const [cardList, setCardList] = useState<Card[]>([])
	const [isAdding, setIsAdding] = useState(false)
	const [isSecondSide, setIsSecondSide] = useState(false)
	return (
		<CardContext.Provider
			value={{
				cardList,
				setCardList,
				isAdding,
				setIsAdding,
				editingCard,
				setEditingCard,
				isSecondSide,
				setIsSecondSide,
			}}>
			{children}
		</CardContext.Provider>
	)
}
export { CardListProvider, CardContext }
