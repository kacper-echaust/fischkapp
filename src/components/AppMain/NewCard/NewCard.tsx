import { useFetch } from '../../../useFetch'
import { CardContext, CardSide } from '../../Context/CardListProvider'
import { Buttons } from './Buttons/Buttons'
import styles from './NewCard.module.css'
import React, { ChangeEvent, useContext, useState } from 'react'

const NewCard = () => {
	const { setIsAddingNewCard, setCardList, currentSide, setCurrentSide } = useContext(CardContext)
	const { addNewCard } = useFetch()
	const [card, setCardValues] = useState({
		front: '',
		back: '',
	})

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (currentSide === CardSide.Front) {
			setCardValues(prevValue => {
				return { ...prevValue, front: event.target.value, id: Date.now() }
			})
		} else {
			setCardValues(prevValue => {
				return { ...prevValue, back: event.target.value, id: Date.now() }
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
		// setCardList((prevCardList) => {
		//   return [...prevCardList, card];
		// });
		addNewCard(card.front, card.back)
		setCurrentSide(CardSide.Front)
		setIsAddingNewCard(false)
		setCardValues({ front: '', back: '' })
	}
	const handleDelete = () => {
		setCardValues({ front: '', back: '' })
		setCurrentSide(CardSide.Front)
		setIsAddingNewCard(false)
	}
	return (
		<form
			className={styles.form}
			onSubmit={event => {
				event.preventDefault()
			}}>
			{currentSide && <label className={styles.label}>{card.front}</label>}
			<input
				className={styles.input}
				type='text'
				onChange={handleInputChange}
				value={currentSide === CardSide.Back ? card.back : card.front}
			/>
			<Buttons
				side={currentSide}
				onCancel={handleCancel}
				onNext={handleNext}
				onBack={handleBack}
				onSave={handleSave}
				edit={false}
			/>
			{currentSide === CardSide.Back && (
				<img src='trash-icon.png' alt='trash icon' className={styles.editIcon} onClick={handleDelete} />
			)}
		</form>
	)
}

export { NewCard, CardSide }
