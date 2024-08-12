import { CardContext } from '../../Context/CardListProvider'
import { Card } from '../../types'
import styles from './NewCard.module.css'
import React, { ChangeEvent, useContext, useState } from 'react'

enum CardSide {
	Front = 'front',
	Back = 'back',
}

const NewCard = () => {
	const [card, setCardValues] = useState<Card>({
		title: '',
		value: '',
	})
	const [currentSide, setCurrentSide] = useState(CardSide.Front)
	const { setIsAddingNewCard, setCardList } = useContext(CardContext)
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (currentSide === CardSide.Front) {
			setCardValues(prevValue => {
				return { ...prevValue, title: event.target.value }
			})
		} else {
			setCardValues(prevValue => {
				return { ...prevValue, value: event.target.value }
			})
		}
	}
	const handleCancel = () => {
		setIsAddingNewCard(false)
	}
	const handleNext = () => {
		setCurrentSide(CardSide.Back)
	}
	const handleBack = () => {
		setCurrentSide(CardSide.Front)
	}
	const handleSave = () => {
		setCardList(prevCardList => {
			return [...prevCardList, card]
		})
		setCurrentSide(CardSide.Front)
		setIsAddingNewCard(false)
		setCardValues({ title: '', value: '' })
	}
	return (
		<form
			className={styles.form}
			onSubmit={event => {
				event.preventDefault()
			}}>
			{currentSide && <label className={styles.label}>{card.title}</label>}
			<input
				className={styles.input}
				type='text'
				onChange={handleInputChange}
				value={currentSide === CardSide.Back ? card.value : card.title}
			/>
			<div className={styles.containerButtons}>
				<button
					className={styles.cancelButton}
					onClick={currentSide === CardSide.Back ? handleBack : handleCancel}>
					{currentSide === CardSide.Back ? 'Back' : 'Cancel'}
				</button>
				<button className={styles.nextButton} onClick={currentSide === CardSide.Back ? handleSave : handleNext}>
					{currentSide === CardSide.Back ? 'Save' : 'Next'}
				</button>
			</div>
		</form>
	)
}

export { NewCard }
