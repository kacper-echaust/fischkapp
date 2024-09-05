import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AppMain } from '../components/AppMain/AppMain'

test('edit card', () => {
	render(<AppMain />)

	const editIcon = screen.getAllByAltText('edit icon')[0]
	fireEvent.click(editIcon)

	const input = screen.getByRole('textbox')
	fireEvent.change(input, { target: { value: 'something' } })

	const saveButton = screen.getByRole('button', { name: /save/i })
	fireEvent.click(saveButton)
	waitFor(() => {
		expect(screen.getByText('something')).toBeInTheDocument()
	})
})

test('delete card', () => {
	render(<AppMain />)

	const cards = screen.getAllByRole('card')
	expect(cards.length).toBeGreaterThan(0)

	const editIcon = screen.getAllByAltText('edit icon')[0]
	fireEvent.click(editIcon)

	const deleteIcon = screen.getByAltText('trash icon')
	fireEvent.click(deleteIcon)

	waitFor(() => {
		expect(cards.length).toBe(cards.length - 1)
	})
})
