import { CardContext } from '../../Context/CardListProvider'
import styles from './NewCard.module.css'
import React, { ChangeEvent, useContext } from 'react'

const NewCard = () => {
	const { setEditingCard, editingCard, setIsAdding, isSecondSide, setIsSecondSide, setCardList } =
		useContext(CardContext)
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (!isSecondSide) {
			setEditingCard(prevValue => {
				return { ...prevValue, title: event.target.value }
			})
		} else {
			setEditingCard(prevValue => {
				return { ...prevValue, value: event.target.value }
			})
		}
	}
	const handleCancel = () => {
		setIsAdding(false)
	}
	const handleNext = () => {
		setIsSecondSide(true)
	}
	const handleBack = () => {
		setIsSecondSide(false)
	}
	const handleSave = () => {
		setCardList(prevCardList => {
			return [...prevCardList, editingCard]
		})
		setIsSecondSide(false)
		setIsAdding(false)
		setEditingCard({ title: '', value: '' })
	}
	return (
		<form
			className={styles.form}
			onSubmit={event => {
				event.preventDefault()
			}}>
			{isSecondSide && <label className={styles.label}>{editingCard.title}</label>}
			<input
				className={styles.input}
				type='text'
				onChange={handleInputChange}
				value={isSecondSide ? editingCard.value : editingCard.title}
			/>
			<div className={styles.containerButtons}>
				<button className={styles.cancelButton} onClick={isSecondSide ? handleBack : handleCancel}>
					{isSecondSide ? 'Back' : 'Cancel'}
				</button>
				<button className={styles.nextButton} onClick={isSecondSide ? handleSave : handleNext}>
					{isSecondSide ? 'Save' : 'Next'}
				</button>
			</div>
		</form>
	)
}

export { NewCard }
