import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './AppClass'

const leftButton = () => screen.getByText('LEFT')
const upButton = () => screen.getByText('UP')
const rightButton = () => screen.getByText('RIGHT')
const downButton = () => screen.getByText('DOWN')
const resetButton = () => screen.getByText('reset')
const emailField = () => screen.getByPlaceholderText('type email')
beforeEach(() =>{
  render(<App/>)
})
describe('student tests', () => {
  test('rendering', ()=>{
    screen.debug()
  })
  test('can see it all', () => {
    expect(leftButton()).toBeInTheDocument()
    expect(upButton()).toBeInTheDocument()
    expect(rightButton()).toBeInTheDocument()
    expect(downButton()).toBeInTheDocument()
    expect(resetButton()).toBeInTheDocument()
    expect(emailField()).toBeInTheDocument()
  })
  test('inputting an email and double checking value passes through', () =>{
    fireEvent.change(emailField(), {target: {value: 'lady@gaga.com'}});
    expect(emailField()).toHaveValue('lady@gaga.com')
  })
})
