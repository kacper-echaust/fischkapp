import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { CardSide, NewCard } from '../components/AppMain/NewCard/NewCard'
import { Buttons } from '../components/AppMain/NewCard/Buttons/Buttons'
import { AppHeader } from '../components/AppHeader'

test('error alert when front or back side is empty', () => {
	const onNextMock = jest.fn()
	const onSaveMock = jest.fn()
    render(<AppHeader/>)
	render(<NewCard />)
	render(
		<Buttons side={CardSide.Front} onCancel={() => {}} onSave={() => {}} onBack={() => {}} onNext={onNextMock} />
	)
	const input = screen.getByRole('textbox')
    const addNewCardButton = screen.getByRole('img')
	const nextButton = screen.getByRole('button', { name: /Next/i })
	const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

    fireEvent.click(addNewCardButton)

	fireEvent.change(input, {
		target: { value: '' },
	})

	fireEvent.click(nextButton)
	render(
		<Buttons side={CardSide.Front} onCancel={() => {}} onSave={onSaveMock} onBack={() => {}} onNext={() => {}} />
	)
	const saveButton = screen.getByRole('button', { name: /Save/i })
	fireEvent.change(input, {
		target: { value: '' },
	})

	fireEvent.click(saveButton)

	expect(alertSpy).toHaveBeenCalledWith('Please enter front and back card.')

	alertSpy.mockRestore()
})

test('successfully add new card when both front and back values are present', () => {
	const onNextMock = jest.fn()
	const onSaveMock = jest.fn()
	render(<NewCard />)
	render(
		<Buttons side={CardSide.Front} onCancel={() => {}} onSave={() => {}} onBack={() => {}} onNext={onNextMock} />
	)
	const input = screen.getByRole('textbox')

	const nextButton = screen.getByRole('button', { name: /Next/i })
	const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

	fireEvent.change(input, {
		target: { value: 'Front Side' },
	})

	fireEvent.click(nextButton)

	render(
		<Buttons side={CardSide.Front} onCancel={() => {}} onSave={onSaveMock} onBack={() => {}} onNext={() => {}} />
	)
	const saveButton = screen.getByRole('button', { name: /Save/i })
    
	fireEvent.change(input, {
		target: { value: 'Back Side' },
	})

	fireEvent.click(saveButton)

	expect(alertSpy).toHaveBeenCalledWith('Form successfully submitted!')
	alertSpy.mockRestore()
})
