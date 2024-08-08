import React from 'react'
import { FaceCard } from './Card/FaceCard/FaceCard'

const AppMain = ({ cardList, setCardList }) => {
	return (
		<main>
			{cardList.map((card,index) => {
				return <FaceCard setCardList={setCardList} index={index}/>
			})}
		</main>
	)
}

export { AppMain }
 