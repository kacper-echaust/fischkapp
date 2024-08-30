import React from 'react'
import styles from './Buttons.module.css'
import { CardSide } from '../NewCard'

type ButtonsProps = {
	side?: string
	onCancel: () => void
	onNext?: () => void
	onBack?: () => void
	onSave: () => void
	edit?: boolean
	disabled: boolean
}

const Buttons = ({ side, onBack, onSave, onCancel, onNext, edit }: ButtonsProps) => {
	const propsFirstButton =
		side === CardSide.Front || edit ? { onClick: onCancel, value: 'Cancel' } : { onClick: onBack, value: 'Back' }
	const propsSecondButton =
		side === CardSide.Front ? { onClick: onNext, value: 'Next' } : { onClick: onSave, value: 'Save' }
	return (
		<div className={styles.containerButtons}>
			<button className={styles.cancelButton} {...propsFirstButton}>
				{propsFirstButton.value}
			</button>
			<button className={styles.nextButton} {...propsSecondButton}>
				{propsSecondButton.value}
			</button>
		</div>
	)
}

export { Buttons }
