// Write your tests here
import AppFunctional from "./AppFunctional"
import React from "react"
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

test('[1] Renders all headings and buttons', () => {
  render(<AppFunctional/>)
  
  expect(screen.getByText(/Coordinates/i)).toBeVisible()
  expect(screen.getByText(/You moved/i)).toBeVisible()
  expect(screen.getByPlaceholderText(/type email/i)).toBeVisible()

  expect(screen.getByText(/LEFT/i)).toBeVisible()
  expect(screen.getByText(/UP/i)).toBeVisible()
  expect(screen.getByText(/DOWN/i)).toBeVisible()
  expect(screen.getByText(/RIGHT/i)).toBeVisible()
  expect(screen.getByText(/reset/i)).toBeVisible()
})

test('[2] Value of email changes accordingly', async () => {
  render(<AppFunctional/>)
  const user = userEvent.setup()

  const emailInput = screen.getByPlaceholderText(/type email/i)
  await user.type(emailInput, 'email@example.com')

  expect(emailInput.value).toBe('email@example.com')
})

test('[3] Coordinates show the correct initial position', () => {
  render(<AppFunctional/>)

  const activeSquare = screen.getByText('B').closest('div')
  expect(activeSquare).toHaveClass('square active')
})

test('[4] Pressing the move buttons updates the coordinates accordingly', async () => {
  const user = userEvent.setup() 
  render(<AppFunctional/>)

  const upBtn = screen.getByText(/UP/i)
  await user.click(upBtn)

  const coordinates = screen.getByText(/Coordinates/i)
  expect(coordinates).toHaveTextContent('Coordinates (2, 1)')
})

test('[5] Reset button works correctly', async () => {
  const user = userEvent.setup() 
  render(<AppFunctional/>)

  const upBtn = screen.getByText(/UP/i)
  const rightBtn = screen.getByText(/RIGHT/i)
  const resetBtn = screen.getByText(/reset/i)
  const coordinates = screen.getByText(/Coordinates/i)
  const steps = screen.getByText(/You moved/i)

  await user.click(upBtn)
  await user.click(rightBtn)
  await user.click(resetBtn)
  
  expect(coordinates).toHaveTextContent('Coordinates (2, 2)')
  expect(steps).toHaveTextContent('You moved 0 times')
  
})