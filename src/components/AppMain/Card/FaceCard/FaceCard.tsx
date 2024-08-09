import { CardContext } from '../../../Context/CardListProvider'
import styles from './FaceCard.module.css'
import React, { ChangeEvent, useContext } from 'react'

const FaceCard = ({ index }) => {
	const { setCardList } = useContext(CardContext)
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCardList(prevCardList => {
			return prevCardList.map((card, index2) => {
				if (index === index2) {
					return { title: event.target.value, value: '' }
				}
				return card
			})
		})
	}
	return (
		<form
			className={styles.form}
			onSubmit={event => {
				event.preventDefault()
			}}>
			<input className={styles.input} type='text' onChange={handleInputChange} />
			<div className={styles.containerButtons}>
				<button className={styles.cancelButton}>Cancel</button>
				<button className={styles.nextButton}>Next</button>
			</div>
		</form>
	)
}

export { FaceCard }
