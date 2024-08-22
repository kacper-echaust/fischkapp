import React, { ChangeEvent, useContext, useRef, useState } from 'react'
import styles from './DisplayCard.module.css'
import { Buttons } from '../NewCard/Buttons/Buttons'
import { CardContext, CardSide } from '../../Context/CardListProvider'
import { Card } from '../../types'
import { useFetch } from '../../../useFetch'

const DisplayCard = ({ front, back, _id }: Card) => {
	const { setCardList } = useContext(CardContext)
	const { editCard, deleteCard } = useFetch()
	const [isEdit, setIsEdit] = useState(false)
	const [currentSide, setCurrentSide] = useState(CardSide.Front)
	const [currentValue, setCurrentValue] = useState({
		front: front,
		back: back,
	})
	const cardRef = useRef<HTMLDivElement | null>(null)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		setCurrentValue(prevValue => ({
			...prevValue,
			[currentSide === CardSide.Front ? 'front' : 'back']: value,
		}))
	}
	const handleSave = () => {
		setCardList(prevCardList => {
			return prevCardList.map(card => {
				return card._id === _id ? { ...card, front: currentValue.front, back: currentValue.back } : card
			})
		})
		editCard(_id, currentValue.front, currentValue.back)
		setIsEdit(false)
	}
	const handleCancel = () => {
		setIsEdit(false)
	}
	const handleEdit = event => {
		event.stopPropagation()
		setIsEdit(true)
	}
	const handleDelete = () => {
		setCardList(prevCardList => {
			return prevCardList.filter(card => {
				return card._id !== _id
			})
		})
		deleteCard(_id)
		setIsEdit(false)
	}
	const handleFlip = () => {
		setCurrentSide(prevSide => {
			return prevSide === CardSide.Front ? CardSide.Back : CardSide.Front
		})
		if (cardRef.current) {
			cardRef.current.animate(
				[
					{ transform: 'scale(1)', opacity: '1' },
					{ transform: 'scale(0,1)', opacity: '0.5' },
					{ transform: 'scale(1)', opacity: '1' },
				],
				{
					duration: 300,
					iterations: 1,
				}
			)
		}
	}

	return (
		<div className={styles.container} onClick={!isEdit ? handleFlip : undefined} ref={cardRef}>
			{isEdit ? (
				<div className={styles.editModeContainer}>
					<input
						type='text'
						value={currentSide === CardSide.Front ? currentValue.front : currentValue.back}
						onChange={handleInputChange}
						className={styles.input}
					/>
					<Buttons onSave={handleSave} onCancel={handleCancel} edit={isEdit} />
					<img src='trash-icon.png' alt='trash icon' className={styles.editIcon} onClick={handleDelete} />
				</div>
			) : (
				<div>
					<p>{currentSide === CardSide.Front ? currentValue.front : currentValue.back}</p>
					<img
						src='edit-icon.png'
						alt='edit icon'
						className={styles.editIcon}
						onClick={event => {
							handleEdit(event)
						}}
					/>
				</div>
			)}
		</div>
	)
}

export { DisplayCard }
