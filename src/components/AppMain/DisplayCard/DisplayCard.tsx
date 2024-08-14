import React, { ChangeEvent, useContext, useState } from 'react'
import styles from './DisplayCard.module.css'
import { Buttons } from '../NewCard/Buttons/Buttons'
import { Card } from '../../types'
import { CardContext } from '../../Context/CardListProvider'

type DisplayCardProps = {
	value: Card
}
export enum Edit {
	True = 'yes',
	False = 'no',
}
const DisplayCard = ({ value }: DisplayCardProps) => {
	const { setCardList } = useContext(CardContext)
	const [isEdit, setIsEdit] = useState(Edit.False)
	const [currentValue, setCurrentValue] = useState<string>(value.title)
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCurrentValue(event.target.value)
	}
	const handleSave = () => {
		setCardList(prevCardList => {
			return prevCardList.map(card => {
				return card.id === value.id ? { ...card, title: currentValue } : card
			})
		})
		setIsEdit(Edit.False)
	}
	const handleCancel = () => {
		setIsEdit(Edit.False)
	}
	const handleEdit = event => {
		event.stopPropagation()
		setIsEdit(Edit.True)
	}
	const handleDelete = () => {
		setCardList(prevCardList => {
			return prevCardList.filter(card => {
				return card.id !== value.id
			})
		})
		setIsEdit(Edit.False)
	}
	const handleFlip = () => {
		setCurrentValue(prevValue => {
			return prevValue === value.title ? value.value : value.title
		})
	}
	return (
		<div className={styles.container} onClick={isEdit === Edit.False ? handleFlip : undefined}>
			{isEdit === Edit.True ? (
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
