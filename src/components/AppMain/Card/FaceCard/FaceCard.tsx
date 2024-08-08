import styles from './FaceCard.module.css'
import React, { ChangeEvent, useState } from 'react'

const FaceCard = () => {
	const [value, setValue] = useState('')
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}
	return (
		<form
			className={styles.form}
			onSubmit={event => {
				event.preventDefault()
			}}>
			<input className={styles.input} type='text' onChange={handleInputChange} />
			<div className={styles.containerButtons}>
				<button className={styles.cancelButton}>Cancel</button>
				<button className={styles.nextButton}>Next</button>
			</div>
		</form>
	)
}

export { FaceCard }
