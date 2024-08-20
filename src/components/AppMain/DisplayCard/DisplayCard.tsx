import React, { ChangeEvent, useContext, useRef, useState } from 'react'
import styles from './DisplayCard.module.css'
import { Buttons } from '../NewCard/Buttons/Buttons'
import { CardContext, CardSide } from '../../Context/CardListProvider'
import { Card } from '../../types'

const DisplayCard = ({ front, back, _id }: Card) => {
	const { currentSide, setCurrentSide, setCardList } = useContext(CardContext)
	const [isEdit, setIsEdit] = useState(false)
	const [currentValue, setCurrentValue] = useState<string>(front)
	const cardRef = useRef<HTMLDivElement | null>(null)
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCurrentValue(event.target.value)
	}
	const handleSave = () => {
		setCardList(prevCardList => {
			return prevCardList.map(card => {
				return card._id === _id
					? { ...card, [CardSide.Front === currentSide ? 'front' : 'back']: currentValue }
					: card
			})
		})
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
		setIsEdit(false)
	}
	const handleFlip = () => {
		setCurrentSide(prevSide => {
			return prevSide === CardSide.Front ? CardSide.Back : CardSide.Front
		})
		setCurrentValue(prevValue => {
			return prevValue === front ? back : front
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
					<input type='text' value={currentValue} onChange={handleInputChange} className={styles.input} />
					<Buttons onSave={handleSave} onCancel={handleCancel} edit={isEdit} />
					<img src='trash-icon.png' alt='trash icon' className={styles.editIcon} onClick={handleDelete} />
				</div>
			) : (
				<div>
					<p>{currentValue}</p>
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
