import React, { useContext } from 'react'
import styles from './AppHeader.module.css'
import { CardContext } from './Context/CardListProvider'
import logoIcon from '../../public/Logo.png'
import plusIcon from '../../public/Icon.png'

const AppHeader = () => {
	const { handleAddCard, cardList } = useContext(CardContext)

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src={logoIcon} alt='logo' />
				<p>{`Cards: ${cardList.length}`}</p>
			</div>
			<div className={styles.circle} onClick={handleAddCard}>
				<img src={plusIcon} alt='plus icon' />
			</div>
		</header>
	)
}

export { AppHeader }
