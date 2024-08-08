import React from 'react'
import styles from './AppHeader.module.css'
import { CardList } from '../App'
type AppHeaderProps = {
	cardsAmount: number
	setCardList: React.Dispatch<React.SetStateAction<CardList[]>>
	cardList: CardList[]
}
const AppHeader = ({ cardsAmount, setCardList, cardList }: AppHeaderProps) => {
	const handleAddCard = () => {
		setCardList(prevCardList => {
			return [...prevCardList, { title: '', value: '' }]
		})
	}
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src='/Logo.png' alt='logo' />
				<p>{`Cards: ${cardsAmount}`}</p>
			</div>
			<div className={styles.circle} onClick={handleAddCard}>
				<img src='/Icon.png' alt='plus icon' />
			</div>
		</header>
	)
}

export { AppHeader }
