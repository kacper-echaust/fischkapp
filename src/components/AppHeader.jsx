import styles from './AppHeader.module.css'
import { Header } from './Header/Header'
export const AppHeader = () => (
	<header className={styles.header}>
		<Header />
	</header>
)
