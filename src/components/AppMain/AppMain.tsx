import React, { useContext } from 'react'
import { CardContext } from '../Context/CardListProvider'
import { NewCard } from './NewCard/NewCard'
import { DisplayCard } from './DisplayCard/DisplayCard'

const AppMain = () => {
	const { isAdding, cardList } = useContext(CardContext)
	const displayCardList = cardList.map(card => {
		return <DisplayCard value={card.title} />
	})
	return <main>{isAdding ? <NewCard /> : displayCardList}</main>
}

export { AppMain }
