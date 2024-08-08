import React from 'react'
import styles from './AppHeader.module.css'
type AppHeaderProps = {
	cardsAmount: number
}
const AppHeader = ({ cardsAmount }: AppHeaderProps) => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src='/Logo.png' alt='logo' />
				<p>{`Cards: ${cardsAmount}`}</p>
			</div>
			<div className={styles.circle}>
				<img src='/Icon.png' alt='plus icon' />
			</div>
		</header>
	)
}

export { AppHeader }
