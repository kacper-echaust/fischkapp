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
	const { cardList, setCardList } = useContext(CardContext)
	const [isEdit, setIsEdit] = useState(Edit.False)
	const [currentValue, setCurrentValue] = useState<string>(value.title)
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCurrentValue(event.target.value)
	}
	const handleSave = () => {
		const editCardList = cardList.map(card => {
			if (card === value) {
				return { ...card, title: currentValue }
			}
			return card
		})
		setCardList(editCardList)
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
				<div className={styles.editModeContainer}>
					<input type='text' value={currentValue} onChange={handleInputChange} className={styles.input}/>
					<Buttons onSave={handleSave} onCancel={handleCancel} edit={isEdit} />
				</div>
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
