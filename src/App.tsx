import { AppHeader } from './components/AppHeader'
import { AppLayout } from './components/AppLayout'
import { AppMain } from './components/AppMain/AppMain'
import { useState } from 'react'
import './App.css'
import React from 'react'
export type CardList = {
	title: string
	value: string
}
const App = () => {
	const [cardList, setCardList] = useState<CardList[]>([])
	return (
		<AppLayout>
			<AppHeader cardsAmount={cardList.length} cardList={cardList} setCardList={setCardList} />
			<AppMain cardList={cardList} setCardList={setCardList} />
		</AppLayout>
	)
}

export { App }
