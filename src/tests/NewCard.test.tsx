import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { App } from '../App.tsx'

test('error alert when front or back side is empty', () => {
	render(<App />)
	
	const addNewCardButton = screen.getByAltText('plus icon')

	fireEvent.click(addNewCardButton)

	expect(screen.getByRole('form'))

	const input = screen.getByRole('textbox') as HTMLInputElement
	const nextButton = screen.getByRole('button', { name: /next/i })

	expect(input.value).toBe('')

	fireEvent.change(input, { target: { value: 'front text' } })

	expect(input.value).toBe('front text')

	fireEvent.click(nextButton)

	const saveButton = screen.getByRole('button', { name: /save/i })

	fireEvent.change(input, { target: { value: 'back text' } })

	expect(input.value).toBe('back text')

	fireEvent.click(saveButton)

	expect(screen.getByText('front text'))
})
