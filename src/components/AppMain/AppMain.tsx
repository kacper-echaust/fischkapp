import React, { useContext } from 'react'
import { FaceCard } from './Card/FaceCard/FaceCard'
import { CardContext } from '../Context/CardListProvider'

const AppMain = () => {
	const { cardList } = useContext(CardContext)
	return (
		<main>
			{cardList.map((card, index) => {
				return <FaceCard index={index} />
			})}
		</main>
	)
}

export { AppMain }
