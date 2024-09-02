import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
