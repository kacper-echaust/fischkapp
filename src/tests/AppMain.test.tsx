import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { AppMain } from '../components/AppMain/AppMain'

test('delete card', () => {
	render(<AppMain />)

	const countCards = screen.getByRole('main')
	const editIcon = screen.getByAltText('edit icon')

	fireEvent.click(editIcon)

	const deleteIcon = screen.getByAltText('trash icon')

	fireEvent.click(deleteIcon)


	expect(countCards.children).toHaveLength(0)
})
