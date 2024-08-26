import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { NewCard } from '../components/AppMain/NewCard/NewCard'

test('add new card', () => {
	render(<NewCard />)
	const input = screen.getByRole('textbox')
	const addButton = screen.getByTestId('save-button')
	const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
	fireEvent.change(input, {
		target: { value: '' },
	})

	fireEvent.click(addButton)

	expect(alertSpy).toHaveBeenCalledWith('Please enter front and back card.')

	alertSpy.mockRestore()
})
