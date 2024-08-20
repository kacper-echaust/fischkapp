import React, { useContext } from 'react'
import styles from './AppHeader.module.css'
import { CardContext } from './Context/CardListProvider'

const AppHeader = () => {
	const { handleAddCard, cardList } = useContext(CardContext)

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src='/Logo.png' alt='logo' />
				<p>{`Cards: ${cardList.length}`}</p>
			</div>
			<div className={styles.circle} onClick={handleAddCard}>
				<img src='/Icon.png' alt='plus icon' />
			</div>
		</header>
	)
}

export { AppHeader }
