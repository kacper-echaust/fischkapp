import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DisplayCard } from '../components/AppMain/DisplayCard/DisplayCard'

test('try to edit and delete card', () => {
	render(<DisplayCard front='front' back='back' _id={'123'} key={'123'} />)

	const editIcon = screen.getByAltText('edit icon')

	fireEvent.click(editIcon)

	const input = screen.getByRole('textbox') as HTMLInputElement
	const saveButton = screen.getByRole('button', { name: /save/i })
	const cancelButton = screen.getByRole('button', { name: /cancel/i })

	fireEvent.change(input, { target: { value: '' } })
	expect(input.value).toBe('')

	expect(saveButton).toBeDisabled()

	fireEvent.change(input, { target: { value: 'something' } })
	expect(input.value).toBe('something')

	fireEvent.click(cancelButton)

	fireEvent.click(saveButton)

	const text = screen.getByRole('paragraph') as HTMLParagraphElement

	expect(text.textContent).toBe('something')

	const flashCard = screen.getByText('something')

	expect(flashCard).toBeInTheDocument()
	fireEvent.click(editIcon)

	const deleteIcon = screen.getByAltText('trash icon')
	fireEvent.click(deleteIcon)

	expect(flashCard).not.toBeInTheDocument()
})
test('should display flashCards correctly', () => {
	const flashCards = [
		{ front: 'front1', back: 'back1', _id: '1', key: '1' },
		{ front: 'front2', back: 'back2', _id: '2', key: '2' },
	]
	render(
		flashCards.map(flashCard => {
			return <DisplayCard front={flashCard.front} back={flashCard.back} _id={flashCard._id} key={flashCard.key} />
		})
	)
	const firstFlashCard = screen.getByText('front1')
	const secondFlashCard = screen.getByText('front2')

	expect(firstFlashCard).toBeInTheDocument()
	expect(secondFlashCard).toBeInTheDocument()
})
