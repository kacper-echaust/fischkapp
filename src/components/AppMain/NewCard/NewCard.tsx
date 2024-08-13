import { CardContext, CardSide } from '../../Context/CardListProvider'
import { Card } from '../../types'
import { Buttons } from './Buttons/Buttons'
import styles from './NewCard.module.css'
import React, { ChangeEvent, useContext, useState } from 'react'

const NewCard = () => {
	const { setIsAddingNewCard, setCardList, currentSide, setCurrentSide } = useContext(CardContext)
	const [card, setCardValues] = useState<Card>({
		title: '',
		value: '',
	})

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
			<Buttons
				side={currentSide}
				onCancel={handleCancel}
				onNext={handleNext}
				onBack={handleBack}
				onSave={handleSave}
				edit={''}
			/>
		</form>
	)
}

export { NewCard, CardSide }
