import { createContext, useState } from 'react'
import React from 'react'
import { CardList } from '../types'

type CardContextType = {
	cardList: CardList[]
	setCardList: React.Dispatch<React.SetStateAction<CardList[]>>
}
const defaultState = [{ title: '', value: '' }]
const defaultContext: CardContextType = {
	cardList: defaultState,
	setCardList: () => {},
}

const CardContext = createContext<CardContextType>(defaultContext)

const CardListProvider = ({ children }) => {
	const [cardList, setCardList] = useState<CardList[]>([])
	return <CardContext.Provider value={{ cardList, setCardList }}>{children}</CardContext.Provider>
}
export { CardListProvider, CardContext }
