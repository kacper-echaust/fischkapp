import React, { ChangeEvent, useContext, useState } from 'react'
import styles from './DisplayCard.module.css'
import { Buttons } from '../NewCard/Buttons/Buttons'
import { Card } from '../../types'
import { CardContext, CardSide } from '../../Context/CardListProvider'

type DisplayCardProps = {
	value: Card
}
export enum Edit {
	True = 'yes',
	False = 'no',
}
const DisplayCard = ({ value }: DisplayCardProps) => {
	const { setCardList, currentSide } = useContext(CardContext)
	const [isEdit, setIsEdit] = useState(Edit.False)
	const [currentValue, setCurrentValue] = useState<Card>({
		title: '',
		value: '',
	})
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (currentSide === CardSide.Front) {
			setCurrentValue(prevValue => {
				return { ...prevValue, title: event.target.value }
			})
		} else {
			setCurrentValue(prevValue => {
				return { ...prevValue, value: event.target.value }
			})
		}
	}
	const handleSave = () => {
		setCardList(prevCardList => {
			return prevCardList.map(card => {
				return card === value ? { ...card, currentValue } : card
			})
		})
		setIsEdit(Edit.False)
	}
	const handleCancel = () => {
		setIsEdit(Edit.False)
	}
	const handleEdit = () => {
		setIsEdit(Edit.True)
	}
	return (
		<div className={styles.container}>
			{isEdit === Edit.True ? (
				<>
					<input
						type='text'
						value={currentSide === CardSide.Front ? currentValue.title : currentValue.value}
						onChange={handleInputChange}
					/>
					<Buttons onSave={handleSave} onCancel={handleCancel} edit={isEdit} />
				</>
			) : (
				<>
					<p>{value.title}</p>
					<img src='edit-icon.png' alt='edit icon' className={styles.editIcon} onClick={handleEdit} />
				</>
			)}
		</div>
	)
}

export { DisplayCard }
