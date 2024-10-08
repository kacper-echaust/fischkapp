import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { App } from '../App.tsx'
import { NewCard } from '../components/AppMain/NewCard/NewCard.tsx'
import '@testing-library/jest-dom'
import { ValidationError } from '../components/modals/ValidationError.tsx'

test('add card', () => {
	render(<App />)

	const addNewCardButton = screen.getByAltText('plus icon')

	fireEvent.click(addNewCardButton)

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

test('can not add empty card', () => {
	render(<NewCard />)

	const input = screen.getByRole('textbox') as HTMLInputElement
	const nextButton = screen.getByRole('button', { name: /next/i })

	fireEvent.change(input, { target: { value: '' } })

	fireEvent.click(nextButton)
	expect(<ValidationError />)
	
	fireEvent.change(input, { target: { value: 'value' } })
	fireEvent.click(nextButton)
	
	waitFor(() => {
		const saveButton = screen.getByRole('button', { name: /save/i })
		fireEvent.change(input, { target: { value: '' } })
		expect(<ValidationError />)
	})


	
})
