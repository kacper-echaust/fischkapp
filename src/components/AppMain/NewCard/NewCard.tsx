import { useCardsApi } from '../../../hooks/useCardsApi'
import { API_URL } from '../../config'
import { CardContext, CardSide } from '../../Context/CardListProvider'
import { Buttons } from './Buttons/Buttons'
import styles from './NewCard.module.css'
import React, { ChangeEvent, useContext, useState } from 'react'
import { ValidationError } from '../../modals/ValidationError'
import trashIcon from '../../../assets/trash-icon.png'

const NewCard = () => {
	const { setIsAddingNewCard, setCardList, setIsEmptyValue, isEmptyValue } = useContext(CardContext)
	const { addNewCard } = useCardsApi(API_URL)
	const [card, setCardValues] = useState({
		front: '',
		back: '',
		_id: '',
	})
	const [currentSide, setCurrentSide] = useState(CardSide.Front)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCardValues(prevValue => {
			return { ...prevValue, [currentSide]: event.target.value }
		})
	}
	const handleCancel = () => {
		setIsAddingNewCard(false)
	}
	const handleNext = () => {
		if (!card.front) {
			setIsEmptyValue(true)
		} else {
			setIsEmptyValue(false)
			setCurrentSide(CardSide.Back)
		}
	}
	const handleBack = () => {
		setCurrentSide(CardSide.Front)
		setIsEmptyValue(false)
	}
	const handleSave = () => {
		if (!card.back || !card.front) {
			setIsEmptyValue(true)
		} else {
			setIsEmptyValue(false)
			setCardList(prevCardList => {
				return [...prevCardList, card]
			})
			addNewCard(card.front, card.back)
			setCurrentSide(CardSide.Front)
			setIsAddingNewCard(false)
			setCardValues({ front: '', back: '', _id: '' })
		}
	}
	const handleDelete = () => {
		setCardValues({ front: '', back: '', _id: '' })
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
				style={isEmptyValue ? {borderColor: 'red'} : {borderColor: 'black'}}
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
				<img src={trashIcon} alt='trash icon' className={styles.editIcon} onClick={handleDelete} />
			)}
			{isEmptyValue && <ValidationError />}
		</form>
	)
}

export { NewCard, CardSide }
